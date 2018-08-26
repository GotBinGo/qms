<?php

$dns_sig= "dyndns.ali.hu. TSIG QYBP6kl15FG8JvPkZOGp7A==";
$nevszerver= "s18.webtar.hu";
$realm="Auth Requitred";
$most=time();
$ttl=60;
#$sqlhost="192.168.1.4";
$sqlhost="10.0.0.110";
$sqluser="dyndns";
$sqldb="dyndns";
$sqlpw="bU7XAbSSvr";
/*
if preg_match("/checkip/", $_SERVER['SERVER_NAME']) ;
{ 
$ip = $_SERVER['REMOTE_ADDR'];
echo "Current IP Address: ".$ip;
}
*/
$conn=mysqli_connect("$sqlhost","$sqluser","$sqlpw","$sqldb");
if (mysqli_connect_errno()) 
{
  echo "Failed to connect to MySQL: " . mysqli_connect_error();
  return;
}


if (!isset($_SERVER['PHP_AUTH_USER'])) //ha nem küld nevet és pass-t
{

	header("WWW-Authenticate: Basic realm=\"$realm\"");
	header('HTTP/1.0 401 Unauthorized');
	echo 'badauth';
	exit;
} 
else 
{

	$username = mysql_escape_string ($_SERVER['PHP_AUTH_USER']); //escape
	$password = $_SERVER['PHP_AUTH_PW'];	
	$result = mysqli_query($conn,"SELECT id, password FROM user WHERE name = '$username'");		
	$row = mysqli_fetch_array($result);	
	if ($row['password'] == $password) //sikeres login
	{
		//echo "login ok";
		$user_id = $row['id'];
		//echo "logged in </br>";
		if (isset ( $_GET['hostname'])){
		    $hostname = $_GET['hostname'];
		}else{
		    echo "notfqdn";
		    exit;
		}
    		$myip = "auto";
		if(isset($_GET['myip']))
			$myip = $_GET['myip'];
		//echo "$myip";
		if($myip == 'auto')
		{
			$myip =$_SERVER['REMOTE_ADDR'];
		}
		if(!filter_var($myip, FILTER_VALIDATE_IP))
		{
			echo "IP not valid: " . $myip;
		}
		else 
		{
			//echo "IP ok: " . $myip;
			
			$chosen_name = explode(".", $hostname, 2)[0]; // aldomain amit valasztott
			$selected_domain = explode(".", $hostname, 2)[1]; // doamin resze
			$result = mysqli_query($conn,"SELECT id FROM domain WHERE domain = '$selected_domain'");
			$row = mysqli_fetch_array($result);
			$domain_id = $row['id'];
			if($domain_id == "") //ha a domian nincs a táblában
			{
				echo "notfqdn";
			}
			else 
			{			
//			$result = mysqli_query($conn,"SELECT id, disabled FROM domainnevek WHERE name = '$chosen_name' AND domain_id = '$domain_id' AND user_id = '$user_id'");	
			$result = mysqli_query($conn,"SELECT id, ip, disabled, unix_timestamp(end_date) end_date, unix_timestamp(last_update) last_update FROM domainnevek WHERE name = '$chosen_name' AND domain_id = '$domain_id' AND user_id = '$user_id'");	
				$row = mysqli_fetch_array($result);
				$state = $row['disabled'];
				$reservation_id = $row['id'];
				$lejar = $row['end_date'];
				$last_update = $row['last_update'];
				$ip = $row['ip'];
				if($state == "")  //ha nincs ilyen név a user-nek
				{
					echo "nohost";
				}
				elseif($state == "1") //ha van de tiltva van
				{
					echo "abuse";
				} elseif ( $ip === $myip)
				{
					echo "nochg";
					//ezt majd ki lehet venni csak hogz lehessen látni
					mysqli_query($conn,"UPDATE domainnevek SET last_update= FROM_UNIXTIME(".$most.") WHERE id= '$reservation_id'");						
					if ( $last_update <= $most-24*3600)
					{
					mysqli_query($conn,"UPDATE domainnevek SET last_update= FROM_UNIXTIME(".$most.") WHERE id= '$reservation_id'");						
					}
				} elseif ( $lejar <= $most)
				{
					echo "expired";
				}
				else //minden jó, ns frissítése, tölés majd írás
				{		
					//echo "</br>setting $myip to $chosen_name";
					require_once 'Net/DNS.php';
					$resolver = new Net_DNS_Resolver();
					$resolver->nameservers = array($nevszerver);
					$packet = new Net_DNS_Packet();
					$packet->header = new Net_DNS_Header();
					$packet->header->id = $resolver->nextid();
					$packet->header->qr = 0;
					$packet->header->opcode = "UPDATE";
					$packet->question[0] = new Net_DNS_Question($selected_domain, "SOA", "IN");
					$packet->answer = array();
					$rrDel =& Net_DNS_RR::factory("$chosen_name.$selected_domain. 0 ANY ANY ANY");
					$rrAdd =& Net_DNS_RR::factory("$chosen_name.$selected_domain. $ttl IN A $myip"); //60 volt
					$packet->authority[0] = $rrDel;
					$packet->authority[1] = $rrAdd;
					$tsig =& Net_DNS_RR::factory($dns_sig);
					$packet->additional = array($tsig);
					$packet->header->qdcount = count($packet->question);
					$packet->header->ancount = count($packet->answer);
					$packet->header->nscount = count($packet->authority);
					$packet->header->arcount = count($packet->additional);
					$response = $resolver->send_tcp($packet, $packet->data());
					
					if ($response->header->rcode != "NOERROR") {  //ha hiba van
						//echo "</br>".$response->header->rcode;
						echo "dnserr";
						return($response->header->rcode);					
					}
					else //ha minden rendben vam
					{
						echo "good";
						mysqli_query($conn,"UPDATE domainnevek SET ip='$myip', last_update= FROM_UNIXTIME(".$most.") WHERE id= '$reservation_id'");						
					}
				}
			}
		}
	}
	else //sikertelen login, újra feldobja
	{		
		header("WWW-Authenticate: Basic realm=\"$realm\"");
		header('HTTP/1.0 401 Unauthorized');
		echo 'badauth';
		exit;
	}
}
?>