<?php
// ZeroQueries Image Upload Endpoint for Hostinger PHP
require_once __DIR__ . '/config.php';

header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'error' => 'Method not allowed']);
    exit;
}

if (!isset($_FILES['file']) || $_FILES['file']['error'] !== UPLOAD_ERR_OK) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'No valid image file uploaded']);
    exit;
}

$file = $_FILES['file'];
$originalName = basename($file['name']);
$ext = strtolower(pathinfo($originalName, PATHINFO_EXTENSION));

$allowedExts = ['jpg', 'jpeg', 'png', 'webp', 'gif', 'svg'];
if (!in_array($ext, $allowedExts)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Only image files (JPG, PNG, WEBP, GIF, SVG) are allowed']);
    exit;
}

$cleanBase = preg_replace('/[^a-z0-9_-]/i', '_', pathinfo($originalName, PATHINFO_FILENAME));
$filename = $cleanBase . '-' . time() . '.' . $ext;

$uploadDir = dirname(__DIR__) . '/uploads';
if (!is_dir($uploadDir)) {
    mkdir($uploadDir, 0755, true);
}

$targetPath = $uploadDir . '/' . $filename;

if (move_uploaded_file($file['tmp_name'], $targetPath)) {
    $url = '/uploads/' . $filename;
    echo json_encode([
        'success' => true,
        'message' => 'Image uploaded successfully',
        'url' => $url,
        'filename' => $filename
    ]);
} else {
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => 'Failed to save uploaded file']);
}
