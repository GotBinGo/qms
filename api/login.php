<?php
include 'conn.php';

session_start();

if (!isset($_GET['username']) || !isset($_GET['password'])) //ha nem küld nevet és pass-t
{
	$status = 'missing field';
	echo json_encode($status);
    exit;
} 
$conn=mysqli_connect("$sqlhost","$sqluser","$sqlpw","$sqldb");
if (mysqli_connect_errno()) 
{
    $status = 'db error';
    echo json_encode($status);
    exit;
}

$username = mysql_escape_string ($_GET['username']);
$password = $_GET['password'];	
$result = mysqli_query($conn, "SELECT id, password FROM user WHERE name = '$username'");		
$row = mysqli_fetch_array($result);
if ($row != null && $row['password'] == $password) //sikeres login
{
    $_SESSION["user"] = $row['id'];
    $status = 'good';
}
else
{
    $status = 'bad login';
}

echo json_encode($status);
?>