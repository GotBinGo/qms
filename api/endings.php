<?php
include 'conn.php';

session_start();
$conn=mysqli_connect("$sqlhost","$sqluser","$sqlpw","$sqldb");
if (mysqli_connect_errno()) 
{
  echo "Failed to connect to MySQL: " . mysqli_connect_error();
  return;
}
if(!isset($_SESSION["user"]))
{
  echo "not logged in";
  exit;
}

$result = mysqli_query($conn, "SELECT domain.domain FROM domain");		
$rows = array();
while($r = mysqli_fetch_assoc($result)) {
    $rows[] = $r;
}
print json_encode($rows);
?>