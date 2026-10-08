<?php
error_reporting(E_ALL);
ini_set('display_errors', '1');

header("Content-Type: application/json; charset=UTF-8");

require_once __DIR__ . '/smtp_helper.php';

$testTo = $_GET['to'] ?? 'info@invertiosolutions.com';
$subject = "Test SMTP Email - ZeroQueries - " . date("H:i:s");
$body = "<h1>Hostinger PHPMailer Test</h1><p>This is a test email sent at " . date("Y-m-d H:i:s") . "</p>";

$res = sendSmtpEmail($testTo, $subject, $body, "info@invertiosolutions.com", "ZeroQueries Test");

echo json_encode([
    "target_email" => $testTo,
    "smtp_result" => $res
], JSON_PRETTY_PRINT);
