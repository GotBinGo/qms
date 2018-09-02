<?php
include 'conn.php';

session_start();
if(!isset($_SESSION["user"]))
{
  print json_encode(true);
}
else {
  print json_encode(false);
}

?>