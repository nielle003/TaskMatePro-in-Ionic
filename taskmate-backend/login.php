<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require 'vendor/autoload.php';
use \Firebase\JWT\JWT;

require 'db.php'; // ✅ This should define $conn

$secret_key = "your_secret_key";

// Get and decode incoming JSON data
$data = json_decode(file_get_contents("php://input"), true);

// 🧪 Debug: Temporarily log the input
file_put_contents("debug.txt", print_r($data, true));

// Check if required fields are present
if (!$data || !isset($data['email']) || !isset($data['password'])) {
    echo json_encode(["success" => false, "message" => "Missing input"]);
    exit;
}

$email = $data['email'];
$password = $data['password'];

// NEVER use raw SQL with user input. Use prepared statements:
$stmt = $conn->prepare("SELECT * FROM users WHERE email = ? AND password = ?");
$stmt->bind_param("ss", $email, $password);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    $user = $result->fetch_assoc();

    $payload = array(
        "user_id" => $user['id'],
        "email" => $user['email'],
        "exp" => time() + 3600 // 1 hour expiration
    );

    $jwt = JWT::encode($payload, $secret_key, 'HS256');

    echo json_encode([
        "success" => true,
        "token" => $jwt
    ]);
} else {
    echo json_encode(["success" => false, "message" => "Invalid credentials"]);
}

$conn->close();
?>
