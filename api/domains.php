<?php
include 'conn.php';

session_start();
$conn=mysqli_connect("$sqlhost","$sqluser","$sqlpw","$sqldb");
if (mysqli_connect_errno()) 
{
  echo "Failed to connect to MySQL: " . mysqli_connect_error();
  return;
}

$userid = $_SESSION["user"];

$result = mysqli_query($conn, "SELECT domainnevek.name, domain.domain, domainnevek.ip FROM domainnevek JOIN domain ON domainnevek.domain_id = domain.id WHERE domainnevek.user_id = '$userid'");		
$rows = array();
while($r = mysqli_fetch_assoc($result)) {
    $rows[] = $r;
}
print json_encode($rows);
?>