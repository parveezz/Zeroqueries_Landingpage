<?php
// ZeroQueries Contact API Endpoint for Hostinger (MySQL or JSON Fallback)
require_once __DIR__ . '/config.php';

$method = $_SERVER['REQUEST_METHOD'];
$pdo = get_db_connection();

if ($method === 'POST') {
    $raw_input = file_get_contents('php://input');
    $input = json_decode($raw_input, true);

    $firstName = trim($input['firstName'] ?? '');
    $lastName  = trim($input['lastName'] ?? '');
    $email     = trim($input['email'] ?? '');
    $phone     = trim($input['phone'] ?? '');
    $topic     = trim($input['topic'] ?? 'General Inquiry');
    $message   = trim($input['message'] ?? '');

    if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        json_response(['success' => false, 'error' => 'A valid email address is required'], 400);
    }
    if (empty($firstName)) {
        json_response(['success' => false, 'error' => 'Your name is required'], 400);
    }

    // ========================================================
    // Send Email Notifications via PHP mail()
    // ========================================================
    // 1. Email to Admin
    $admin_subject = "[ZeroQueries] New Contact Inquiry: " . $firstName . " " . $lastName . " (" . $topic . ")";
    $admin_body = '
    <div style="font-family: -apple-system, BlinkMacSystemFont, \'Segoe UI\', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 28px; background: #ffffff; border: 1px solid #e5e7eb; border-radius: 16px;">
        <div style="border-bottom: 2px solid #6434F5; padding-bottom: 16px; margin-bottom: 24px;">
            <h2 style="margin: 0; color: #111827; font-size: 20px; font-weight: 600;">ZeroQueries Contact Notification</h2>
            <p style="margin: 4px 0 0 0; color: #6b7280; font-size: 13px;">New message submitted via zeroqueries.com/contact</p>
        </div>
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px; font-size: 14px;">
            <tr>
                <td style="padding: 8px 0; color: #6b7280; width: 120px;">Name:</td>
                <td style="padding: 8px 0; color: #111827; font-weight: 600;">' . htmlspecialchars($firstName . ' ' . $lastName) . '</td>
            </tr>
            <tr>
                <td style="padding: 8px 0; color: #6b7280;">Email:</td>
                <td style="padding: 8px 0; color: #6434F5; font-weight: 500;"><a href="mailto:' . htmlspecialchars($email) . '" style="color: #6434F5; text-decoration: none;">' . htmlspecialchars($email) . '</a></td>
            </tr>
            ' . (!empty($phone) ? '<tr><td style="padding: 8px 0; color: #6b7280;">Phone:</td><td style="padding: 8px 0; color: #111827;">' . htmlspecialchars($phone) . '</td></tr>' : '') . '
            <tr>
                <td style="padding: 8px 0; color: #6b7280;">Topic:</td>
                <td style="padding: 8px 0; color: #111827;"><span style="display: inline-block; padding: 3px 10px; background: #f3f0ff; color: #6434F5; border-radius: 20px; font-size: 12px; font-weight: 500;">' . htmlspecialchars($topic) . '</span></td>
            </tr>
            <tr>
                <td style="padding: 8px 0; color: #6b7280;">Date:</td>
                <td style="padding: 8px 0; color: #111827;">' . date('F j, Y, g:i a') . '</td>
            </tr>
        </table>
        <div style="background: #f9fafb; padding: 18px; border-radius: 12px; border: 1px solid #f3f4f6; margin-bottom: 24px;">
            <p style="margin: 0 0 8px 0; color: #374151; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em;">Message Content:</p>
            <p style="margin: 0; color: #1f2937; font-size: 14px; line-height: 1.6; white-space: pre-wrap;">' . nl2br(htmlspecialchars($message ?: 'No message text provided.')) . '</p>
        </div>
        <div style="text-align: center; padding-top: 8px;">
            <a href="mailto:' . htmlspecialchars($email) . '?subject=' . rawurlencode('Re: Your inquiry about ' . $topic) . '" style="display: inline-block; background: #6434F5; color: #ffffff; padding: 10px 24px; border-radius: 8px; text-decoration: none; font-size: 13px; font-weight: 500;">Reply to ' . htmlspecialchars($firstName) . '</a>
        </div>
    </div>';
    send_system_mail(ADMIN_EMAIL, $admin_subject, $admin_body, $email);

    // 2. Receipt Confirmation Email to User
    $user_subject = "We've received your message - ZeroQueries";
    $user_body = '
    <div style="font-family: -apple-system, BlinkMacSystemFont, \'Segoe UI\', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 28px; background: #ffffff; border: 1px solid #e5e7eb; border-radius: 16px;">
        <div style="border-bottom: 2px solid #6434F5; padding-bottom: 16px; margin-bottom: 24px;">
            <h2 style="margin: 0; color: #111827; font-size: 22px; font-weight: 600;">ZeroQueries</h2>
            <p style="margin: 4px 0 0 0; color: #6b7280; font-size: 13px;">AI-Powered Enterprise Decision Intelligence</p>
        </div>
        <p style="color: #111827; font-size: 15px; line-height: 1.6;">Hello ' . htmlspecialchars($firstName) . ',</p>
        <p style="color: #4b5563; font-size: 14px; line-height: 1.6;">
            Thank you for reaching out to ZeroQueries regarding <strong>' . htmlspecialchars($topic) . '</strong>. We have successfully received your inquiry and our team is already reviewing it.
        </p>
        <p style="color: #4b5563; font-size: 14px; line-height: 1.6;">
            A representative will respond to this email address within 24 business hours.
        </p>
        <div style="background: #f9fafb; padding: 16px; border-radius: 12px; border: 1px solid #f3f4f6; margin: 20px 0;">
            <p style="margin: 0 0 6px 0; color: #6b7280; font-size: 12px; text-transform: uppercase;">Summary of your message:</p>
            <p style="margin: 0; color: #1f2937; font-size: 13px; line-height: 1.5; font-style: italic;">"' . nl2br(htmlspecialchars($message ?: 'No message provided.')) . '"</p>
        </div>
        <p style="color: #9ca3af; font-size: 12px; margin-top: 28px; border-top: 1px solid #f3f4f6; padding-top: 16px;">
            ZeroQueries, Inc. • Enterprise Decision Intelligence • <a href="https://zeroqueries.com" style="color: #6434F5; text-decoration: none;">zeroqueries.com</a>
        </p>
    </div>';
    send_system_mail($email, $user_subject, $user_body);

    if ($pdo) {
        try {
            $stmt = $pdo->prepare("INSERT INTO `contact_inquiries` 
                (`first_name`, `last_name`, `email`, `phone`, `topic`, `message`) 
                VALUES (:first_name, :last_name, :email, :phone, :topic, :message)");
            $stmt->execute([
                ':first_name' => $firstName,
                ':last_name'  => $lastName,
                ':email'      => $email,
                ':phone'      => $phone,
                ':topic'      => $topic,
                ':message'    => $message,
            ]);
            json_response([
                'success' => true,
                'message' => 'Thank you! Your inquiry has been saved and notifications dispatched.',
                'id'      => $pdo->lastInsertId()
            ], 201);
        } catch (PDOException $e) {
            error_log("Contact DB Insert Error: " . $e->getMessage());
        }
    }

    // JSON file fallback
    $file = __DIR__ . '/data/contact.json';
    $entries = file_exists($file) ? json_decode(file_get_contents($file), true) : [];
    if (!is_array($entries)) $entries = [];

    $newEntry = [
        'id'        => count($entries) + 1,
        'firstName' => $firstName,
        'lastName'  => $lastName,
        'email'     => $email,
        'phone'     => $phone,
        'topic'     => $topic,
        'message'   => $message,
        'createdAt' => date('c')
    ];
    array_unshift($entries, $newEntry);
    if (!is_dir(__DIR__ . '/data')) mkdir(__DIR__ . '/data', 0755, true);
    file_put_contents($file, json_encode($entries, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));

    json_response([
        'success' => true,
        'message' => 'Thank you! Your inquiry has been saved and notifications dispatched.',
        'data'    => $newEntry
    ], 201);
}

if ($method === 'GET') {
    if ($pdo) {
        $stmt = $pdo->query("SELECT * FROM `contact_inquiries` ORDER BY `id` DESC LIMIT 100");
        json_response(['success' => true, 'data' => $stmt->fetchAll()]);
    }

    $file = __DIR__ . '/data/contact.json';
    $entries = file_exists($file) ? json_decode(file_get_contents($file), true) : [];
    json_response(['success' => true, 'data' => is_array($entries) ? $entries : []]);
}

if ($method === 'DELETE') {
    $id = $_GET['id'] ?? null;
    if (!$id) json_response(['success' => false, 'error' => 'ID is required'], 400);

    if ($pdo) {
        $stmt = $pdo->prepare("DELETE FROM `contact_inquiries` WHERE `id` = :id");
        $stmt->execute([':id' => $id]);
        json_response(['success' => true, 'message' => 'Inquiry deleted']);
    }

    $file = __DIR__ . '/data/contact.json';
    $entries = file_exists($file) ? json_decode(file_get_contents($file), true) : [];
    if (is_array($entries)) {
        $entries = array_values(array_filter($entries, fn($item) => (string)$item['id'] !== (string)$id));
        file_put_contents($file, json_encode($entries, JSON_PRETTY_PRINT));
    }
    json_response(['success' => true, 'message' => 'Inquiry deleted']);
}

json_response(['success' => false, 'error' => 'Method not allowed'], 405);
