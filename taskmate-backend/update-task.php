<?php
include 'db.php';
require 'vendor/autoload.php';
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Authorization, Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");


$secret_key = "your_secret_key";

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}
$jwt = null;

$headers = getallheaders();
if (isset($headers['Authorization'])) {
    if (preg_match('/Bearer\s(\S+)/', $headers['Authorization'], $matches)) {
        $jwt = $matches[1];
    }
}

$decoded = null;

try {
    $decoded = JWT::decode($jwt, new Key($secret_key, 'HS256'));
    $userId = $decoded->user_id;
} catch (Exception $e) {
    echo json_encode(["success" => false, "message" => "Invalid token"]);
    exit;
}

$data = json_decode(file_get_contents("php://input"), true);

$title = $data['title'];
$description = $data['description'];
$due_date = $data['due_date'];
$id = $data['id'];

$stmt = $conn->prepare("UPDATE tasks SET title=?, description=?, due_date=? WHERE id=? AND user_id=?");
$stmt->bind_param("sssii", $title, $description, $due_date, $id, $userId);

if ($stmt->execute()) {
    echo json_encode(["success" => true, "message" => "Task updated"]);
} else {
    echo json_encode(["success" => false, "message" => "Failed to update task"]);
}
