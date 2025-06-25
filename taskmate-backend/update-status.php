<?php
include 'db.php';
require 'vendor/autoload.php';
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: POST, OPTIONS, UPDATE");

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

try {
    $decoded = JWT::decode($jwt, new Key($secret_key, 'HS256'));
    $userId = $decoded->user_id;
} catch (Exception $e) {
    echo json_encode(["success" => false, "message" => "Invalid token"]);
    exit;
}


$data = json_decode(file_get_contents("php://input"), true);
$id = $data['id'];
$status = $data['status'];


$stmt = $conn->prepare("UPDATE tasks SET status = ? WHERE id = ? AND user_id=?");
$stmt->bind_param("sii", $status, $id, $userId);

$response = [];

if ($stmt->execute()) {
    $response['success'] = true;
} else {
    $response['success'] = false;
    $response['message'] = 'Failed to update status';
}

echo json_encode($response);
$conn->close();
?>
