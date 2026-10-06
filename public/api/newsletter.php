<?php
// ZeroQueries Newsletter API Endpoint for Hostinger (MySQL or JSON Fallback)
require_once __DIR__ . '/config.php';

$method = $_SERVER['REQUEST_METHOD'];
$pdo = get_db_connection();

if ($method === 'POST') {
    $raw_input = file_get_contents('php://input');
    $input = json_decode($raw_input, true);

    $email = trim($input['email'] ?? '');

    if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        json_response(['success' => false, 'error' => 'Please enter a valid email address'], 400);
    }

    // ========================================================
    // Send Email Notifications via PHP mail()
    // ========================================================
    // 1. Notification to Admin
    $admin_subject = "📬 [ZeroQueries] New Newsletter Subscriber: " . $email;
    $admin_body = '
    <div style="font-family: -apple-system, BlinkMacSystemFont, \'Segoe UI\', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 28px; background: #ffffff; border: 1px solid #e5e7eb; border-radius: 16px;">
        <div style="border-bottom: 2px solid #10b981; padding-bottom: 16px; margin-bottom: 20px;">
            <h2 style="margin: 0; color: #111827; font-size: 20px; font-weight: 600;">📬 New Newsletter Subscriber</h2>
            <p style="margin: 4px 0 0 0; color: #6b7280; font-size: 13px;">New subscriber registered via website footer</p>
        </div>
        <p style="margin: 0 0 12px 0; font-size: 15px; color: #111827;">
            <strong>Subscriber Email:</strong> <a href="mailto:' . htmlspecialchars($email) . '" style="color: #6434F5; text-decoration: none;">' . htmlspecialchars($email) . '</a>
        </p>
        <p style="margin: 0 0 16px 0; font-size: 13px; color: #6b7280;">
            Subscribed on ' . date('F j, Y, g:i a') . '
        </p>
        <p style="margin: 0; font-size: 12px; color: #9ca3af; border-top: 1px solid #f3f4f6; padding-top: 12px;">
            ZeroQueries Admin • <a href="https://zeroqueries.com/admin" style="color: #6434F5;">View in Admin Panel</a>
        </p>
    </div>';
    send_system_mail(ADMIN_EMAIL, $admin_subject, $admin_body, $email);

    // 2. Welcome Email to Subscriber
    $user_subject = "Welcome to the ZeroQueries Newsletter!";
    $user_body = '
    <div style="font-family: -apple-system, BlinkMacSystemFont, \'Segoe UI\', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 28px; background: #ffffff; border: 1px solid #e5e7eb; border-radius: 16px;">
        <div style="border-bottom: 2px solid #6434F5; padding-bottom: 16px; margin-bottom: 24px;">
            <h2 style="margin: 0; color: #111827; font-size: 22px; font-weight: 600;">ZeroQueries</h2>
            <p style="margin: 4px 0 0 0; color: #6b7280; font-size: 13px;">AI Decision Intelligence • Engineering & Product Dispatch</p>
        </div>
        <p style="color: #111827; font-size: 15px; line-height: 1.6;">Hello,</p>
        <p style="color: #4b5563; font-size: 14px; line-height: 1.6;">
            Thank you for subscribing to the ZeroQueries newsletter. You\'ll receive our monthly curated insights on:
        </p>
        <ul style="color: #4b5563; font-size: 13px; line-height: 1.7; padding-left: 20px;">
            <li>Modern Data Stack optimization (Snowflake, BigQuery, ClickHouse)</li>
            <li>Zero-retention AI query execution & enterprise safety benchmarks</li>
            <li>New feature releases, connector additions & architecture case studies</li>
        </ul>
        <div style="text-align: center; margin: 24px 0;">
            <a href="https://zeroqueries.com/resources" style="display: inline-block; background: #6434F5; color: #ffffff; padding: 10px 24px; border-radius: 8px; text-decoration: none; font-size: 13px; font-weight: 500;">Explore Latest Articles</a>
        </div>
        <p style="color: #9ca3af; font-size: 12px; margin-top: 28px; border-top: 1px solid #f3f4f6; padding-top: 16px;">
            ZeroQueries, Inc. • You are receiving this because you subscribed on zeroqueries.com.
        </p>
    </div>';
    send_system_mail($email, $user_subject, $user_body);

    if ($pdo) {
        try {
            $stmt = $pdo->prepare("INSERT IGNORE INTO `newsletter_subscribers` (`email`, `status`) VALUES (:email, 'active')");
            $stmt->execute([':email' => $email]);
            json_response([
                'success' => true,
                'message' => 'Thank you for subscribing to ZeroQueries updates!'
            ], 201);
        } catch (PDOException $e) {
            error_log("Newsletter DB Insert Error: " . $e->getMessage());
        }
    }

    // JSON file fallback
    $file = __DIR__ . '/data/newsletter.json';
    $entries = file_exists($file) ? json_decode(file_get_contents($file), true) : [];
    if (!is_array($entries)) $entries = [];

    // Avoid duplicate in JSON
    $alreadyExists = false;
    foreach ($entries as $item) {
        if (isset($item['email']) && strtolower($item['email']) === strtolower($email)) {
            $alreadyExists = true;
            break;
        }
    }

    if (!$alreadyExists) {
        $entries[] = [
            'id'           => count($entries) + 1,
            'email'        => strtolower($email),
            'status'       => 'active',
            'subscribedAt' => date('c')
        ];
        if (!is_dir(__DIR__ . '/data')) mkdir(__DIR__ . '/data', 0755, true);
        file_put_contents($file, json_encode($entries, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
    }

    json_response([
        'success' => true,
        'message' => 'Thank you for subscribing to ZeroQueries updates!'
    ], 201);
}

if ($method === 'GET') {
    if ($pdo) {
        $stmt = $pdo->query("SELECT * FROM `newsletter_subscribers` ORDER BY `id` DESC LIMIT 100");
        json_response(['success' => true, 'data' => $stmt->fetchAll()]);
    }

    $file = __DIR__ . '/data/newsletter.json';
    $entries = file_exists($file) ? json_decode(file_get_contents($file), true) : [];
    json_response(['success' => true, 'data' => is_array($entries) ? $entries : []]);
}

if ($method === 'DELETE') {
    $id = $_GET['id'] ?? null;
    $email = $_GET['email'] ?? null;
    if (!$id && !$email) json_response(['success' => false, 'error' => 'ID or email is required'], 400);

    if ($pdo) {
        if ($id) {
            $stmt = $pdo->prepare("DELETE FROM `newsletter_subscribers` WHERE `id` = :id");
            $stmt->execute([':id' => $id]);
        } else {
            $stmt = $pdo->prepare("DELETE FROM `newsletter_subscribers` WHERE `email` = :email");
            $stmt->execute([':email' => $email]);
        }
        json_response(['success' => true, 'message' => 'Subscriber removed']);
    }

    $file = __DIR__ . '/data/newsletter.json';
    $entries = file_exists($file) ? json_decode(file_get_contents($file), true) : [];
    if (is_array($entries)) {
        $entries = array_values(array_filter($entries, function($item) use ($id, $email) {
            if ($id && (string)$item['id'] === (string)$id) return false;
            if ($email && strtolower($item['email']) === strtolower($email)) return false;
            return true;
        }));
        file_put_contents($file, json_encode($entries, JSON_PRETTY_PRINT));
    }
    json_response(['success' => true, 'message' => 'Subscriber removed']);
}

json_response(['success' => false, 'error' => 'Method not allowed'], 405);
