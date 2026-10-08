<?php
// ZeroQueries Demo Booking API Endpoint for Hostinger (MySQL or JSON Fallback)
require_once __DIR__ . '/config.php';

$method = $_SERVER['REQUEST_METHOD'];
$pdo = get_db_connection();

if ($method === 'POST') {
    $raw_input = file_get_contents('php://input');
    $input = json_decode($raw_input, true);

    $fullName        = trim($input['fullName'] ?? $input['name'] ?? '');
    $workEmail       = trim($input['workEmail'] ?? $input['email'] ?? '');
    $phone           = trim($input['phone'] ?? $input['phoneNumber'] ?? '');
    $organization    = trim($input['organization'] ?? $input['company'] ?? '');
    $role            = trim($input['role'] ?? '');
    $dataEnvironment = trim($input['dataEnvironment'] ?? $input['environment'] ?? '');
    $teamSize        = trim($input['teamSize'] ?? '');
    $message         = trim($input['message'] ?? $input['notes'] ?? '');

    if (empty($workEmail) || !filter_var($workEmail, FILTER_VALIDATE_EMAIL)) {
        json_response(['success' => false, 'error' => 'A valid work email is required'], 400);
    }
    if (empty($fullName)) {
        json_response(['success' => false, 'error' => 'Your full name is required'], 400);
    }
    if (empty($organization)) {
        json_response(['success' => false, 'error' => 'Organization name is required'], 400);
    }

    // ========================================================
    // Send Email Notifications via PHP / SMTP
    // ========================================================
    // 1. Email to Admin
    $admin_subject = "🚀 [ZeroQueries Demo] New Request: " . $fullName . " (" . $organization . ")";
    $admin_body = '
    <div style="font-family: -apple-system, BlinkMacSystemFont, \'Segoe UI\', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 28px; background: #ffffff; border: 1px solid #e5e7eb; border-radius: 16px;">
        <div style="border-bottom: 2px solid #2563eb; padding-bottom: 16px; margin-bottom: 24px;">
            <h2 style="margin: 0; color: #111827; font-size: 20px; font-weight: 600;">🚀 New Enterprise Demo Request</h2>
            <p style="margin: 4px 0 0 0; color: #6b7280; font-size: 13px;">Submitted via zeroqueries.com/demo</p>
        </div>
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px; font-size: 14px;">
            <tr>
                <td style="padding: 8px 0; color: #6b7280; width: 140px;">Lead Name:</td>
                <td style="padding: 8px 0; color: #111827; font-weight: 600;">' . htmlspecialchars($fullName) . '</td>
            </tr>
            <tr>
                <td style="padding: 8px 0; color: #6b7280;">Work Email:</td>
                <td style="padding: 8px 0; color: #2563eb; font-weight: 500;"><a href="mailto:' . htmlspecialchars($workEmail) . '" style="color: #2563eb; text-decoration: none;">' . htmlspecialchars($workEmail) . '</a></td>
            </tr>
            ' . (!empty($phone) ? '<tr><td style="padding: 8px 0; color: #6b7280;">Phone:</td><td style="padding: 8px 0; color: #111827;">' . htmlspecialchars($phone) . '</td></tr>' : '') . '
            <tr>
                <td style="padding: 8px 0; color: #6b7280;">Organization:</td>
                <td style="padding: 8px 0; color: #111827; font-weight: 600;">' . htmlspecialchars($organization) . '</td>
            </tr>
            <tr>
                <td style="padding: 8px 0; color: #6b7280;">Role / Title:</td>
                <td style="padding: 8px 0; color: #111827;">' . htmlspecialchars($role ?: 'Not specified') . '</td>
            </tr>
            <tr>
                <td style="padding: 8px 0; color: #6b7280;">Data Environment:</td>
                <td style="padding: 8px 0; color: #111827;"><span style="display: inline-block; padding: 4px 12px; background: #eff6ff; color: #1d4ed8; border-radius: 20px; font-size: 12px; font-weight: 600;">' . htmlspecialchars($dataEnvironment ?: 'Enterprise Data Lake') . '</span></td>
            </tr>
            ' . (!empty($teamSize) ? '<tr><td style="padding: 8px 0; color: #6b7280;">Team Size:</td><td style="padding: 8px 0; color: #111827;">' . htmlspecialchars($teamSize) . '</td></tr>' : '') . '
            ' . (!empty($message) ? '<tr><td style="padding: 8px 0; color: #6b7280; vertical-align: top;">Notes:</td><td style="padding: 8px 0; color: #111827;">' . nl2br(htmlspecialchars($message)) . '</td></tr>' : '') . '
            <tr>
                <td style="padding: 8px 0; color: #6b7280;">Requested At:</td>
                <td style="padding: 8px 0; color: #111827;">' . date('F j, Y, g:i a') . '</td>
            </tr>
        </table>
        <div style="text-align: center; padding-top: 12px; border-top: 1px solid #f3f4f6;">
            <a href="mailto:' . htmlspecialchars($workEmail) . '?subject=' . rawurlencode('ZeroQueries Demo Scheduling for ' . $organization) . '" style="display: inline-block; background: #2563eb; color: #ffffff; padding: 10px 24px; border-radius: 8px; text-decoration: none; font-size: 13px; font-weight: 500;">Schedule Demo with ' . htmlspecialchars($fullName) . '</a>
        </div>
    </div>';
    send_system_mail(ADMIN_EMAIL, $admin_subject, $admin_body, $workEmail);

    // 2. Confirmation Email to User
    $user_subject = "Your ZeroQueries Enterprise Demo Request is Confirmed";
    $user_body = '
    <div style="font-family: -apple-system, BlinkMacSystemFont, \'Segoe UI\', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 28px; background: #ffffff; border: 1px solid #e5e7eb; border-radius: 16px;">
        <div style="border-bottom: 2px solid #6434F5; padding-bottom: 16px; margin-bottom: 24px;">
            <h2 style="margin: 0; color: #111827; font-size: 22px; font-weight: 600;">ZeroQueries</h2>
            <p style="margin: 4px 0 0 0; color: #6b7280; font-size: 13px;">AI Decision Intelligence • Enterprise Demos</p>
        </div>
        <p style="color: #111827; font-size: 15px; line-height: 1.6;">Hello ' . htmlspecialchars($fullName) . ',</p>
        <p style="color: #4b5563; font-size: 14px; line-height: 1.6;">
            Thank you for requesting a tailored demonstration of ZeroQueries for <strong>' . htmlspecialchars($organization) . '</strong>.
        </p>
        <p style="color: #4b5563; font-size: 14px; line-height: 1.6;">
            One of our senior enterprise architects will reach out shortly to coordinate a 30-minute interactive walkthrough focused on your data stack (' . htmlspecialchars($dataEnvironment ?: 'enterprise environments') . ').
        </p>
        <div style="background: #f9fafb; padding: 16px; border-radius: 12px; border: 1px solid #f3f4f6; margin: 20px 0;">
            <p style="margin: 0 0 4px 0; color: #111827; font-size: 13px; font-weight: 600;">What we will cover in your session:</p>
            <ul style="margin: 8px 0 0 0; padding-left: 20px; color: #4b5563; font-size: 13px; line-height: 1.6;">
                <li>Zero-training natural language query execution over structured & unstructured stores</li>
                <li>WhatsApp & Slack enterprise integration architecture</li>
                <li>Sub-second query caching & air-gapped security model</li>
            </ul>
        </div>
        <p style="color: #9ca3af; font-size: 12px; margin-top: 28px; border-top: 1px solid #f3f4f6; padding-top: 16px;">
            ZeroQueries, Inc. • Enterprise Decision Intelligence • <a href="https://zeroqueries.com" style="color: #6434F5; text-decoration: none;">zeroqueries.com</a>
        </p>
    </div>';
    send_system_mail($workEmail, $user_subject, $user_body);

    if ($pdo) {
        try {
            $stmt = $pdo->prepare("INSERT INTO `demo_requests` 
                (`full_name`, `work_email`, `organization`, `role`, `data_environment`) 
                VALUES (:full_name, :work_email, :organization, :role, :data_environment)");
            $stmt->execute([
                ':full_name'        => $fullName,
                ':work_email'       => $workEmail,
                ':organization'    => $organization,
                ':role'             => $role,
                ':data_environment' => $dataEnvironment,
            ]);
            json_response([
                'success' => true,
                'message' => 'Demo request received! Our engineering team will contact you shortly.',
                'id'      => $pdo->lastInsertId()
            ], 201);
        } catch (PDOException $e) {
            error_log("Demo DB Insert Error: " . $e->getMessage());
        }
    }

    // JSON file fallback
    $file = __DIR__ . '/data/demo.json';
    $entries = file_exists($file) ? json_decode(file_get_contents($file), true) : [];
    if (!is_array($entries)) $entries = [];

    $newEntry = [
        'id'              => count($entries) + 1,
        'fullName'        => $fullName,
        'workEmail'       => $workEmail,
        'phone'           => $phone,
        'organization'    => $organization,
        'role'            => $role,
        'dataEnvironment' => $dataEnvironment,
        'teamSize'        => $teamSize,
        'message'         => $message,
        'createdAt'       => date('c')
    ];
    array_unshift($entries, $newEntry);
    if (!is_dir(__DIR__ . '/data')) mkdir(__DIR__ . '/data', 0755, true);
    file_put_contents($file, json_encode($entries, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));

    json_response([
        'success' => true,
        'message' => 'Demo request received! Our engineering team will contact you shortly.',
        'data'    => $newEntry
    ], 201);
}

if ($method === 'GET') {
    if ($pdo) {
        $stmt = $pdo->query("SELECT * FROM `demo_requests` ORDER BY `id` DESC LIMIT 100");
        json_response(['success' => true, 'data' => $stmt->fetchAll()]);
    }

    $file = __DIR__ . '/data/demo.json';
    $entries = file_exists($file) ? json_decode(file_get_contents($file), true) : [];
    json_response(['success' => true, 'data' => is_array($entries) ? $entries : []]);
}

if ($method === 'DELETE') {
    $id = $_GET['id'] ?? null;
    if (!$id) json_response(['success' => false, 'error' => 'ID is required'], 400);

    if ($pdo) {
        $stmt = $pdo->prepare("DELETE FROM `demo_requests` WHERE `id` = :id");
        $stmt->execute([':id' => $id]);
        json_response(['success' => true, 'message' => 'Demo request deleted']);
    }

    $file = __DIR__ . '/data/demo.json';
    $entries = file_exists($file) ? json_decode(file_get_contents($file), true) : [];
    if (is_array($entries)) {
        $entries = array_values(array_filter($entries, fn($item) => (string)$item['id'] !== (string)$id));
        file_put_contents($file, json_encode($entries, JSON_PRETTY_PRINT));
    }
    json_response(['success' => true, 'message' => 'Demo request deleted']);
}

json_response(['success' => false, 'error' => 'Method not allowed'], 405);
