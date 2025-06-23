<?php
$host = "localhost";
$username = "root";
$password = "admin"; // leave empty for Laragon/XAMPP default
$database = "taskmate"; // make sure this matches your DB name

$conn = new mysqli($host, $username, $password, $database);

// Check connection
if ($conn->connect_error) {
    die(json_encode([
        "success" => false,
        "message" => "Database connection failed: " . $conn->connect_error
    ]));
}
?>
