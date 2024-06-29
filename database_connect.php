<?php
// db.php - Database connection
$servername = "sql203.infinityfree.com";
$username = "if0_36784770";
$password = "bawakontonkyi";
$dbname = "kontonkyi_supply";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>