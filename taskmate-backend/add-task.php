<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require 'vendor/autoload.php';
require 'db.php';
use \Firebase\JWT\JWT;
use \Firebase\JWT\Key;

$secret_key = "your_secret_key";

// Get headers
$headers = getallheaders();
$authHeader = isset($headers['Authorization']) ? $headers['Authorization'] : '';

if (!$authHeader || !preg_match('/Bearer\s(\S+)/', $authHeader, $matches)) {
    echo json_encode(["success" => false, "message" => "No token provided"]);
    exit;
}

$token = $matches[1];

try {
    $decoded = JWT::decode($token, new Key($secret_key, 'HS256'));
    $user_id = $decoded->user_id;

    $data = json_decode(file_get_contents("php://input"), true);

    if (!isset($data['title']) || !isset($data['description']) || !isset($data['due_date'])) {
        echo json_encode(["success" => false, "message" => "Missing input"]);
        exit;
    }

    $title = $data['title'];
    $description = $data['description'];
    $due_date = $data['due_date'];

    $stmt = $conn->prepare("INSERT INTO tasks (user_id, title, description, due_date) VALUES (?, ?, ?, ?)");
    $stmt->bind_param("isss", $user_id, $title, $description, $due_date);

    if ($stmt->execute()) {
        echo json_encode(["success" => true, "message" => "Task added successfully"]);
    } else {
        echo json_encode(["success" => false, "message" => "Failed to add task"]);
    }

} catch (Exception $e) {
    echo json_encode(["success" => false, "message" => "Invalid token"]);
}

$conn->close();
?>
