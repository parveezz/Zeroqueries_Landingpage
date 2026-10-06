<?php
// ZeroQueries Blog API - Hostinger PHP Backend Configuration
// ZERO-CONFIG AUTO-INITIALIZER: Automatically creates tables and seeds data on first run.
// Supports: Hostinger MySQL Database (PDO) with automatic fallback to JSON file storage.

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Content-Type: application/json; charset=UTF-8");

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// ========================================================
// 1. Hostinger MySQL Database Configuration
// ========================================================
define('DB_HOST', getenv('DB_HOST') ?: 'localhost');
define('DB_NAME', getenv('DB_NAME') ?: 'umar_zeroqueries');
define('DB_USER', getenv('DB_USER') ?: 'umar');
define('DB_PASS', getenv('DB_PASS') ?: 'Umar@1234');
define('DB_CHARSET', 'utf8mb4');

// Mail Notification Settings (Hostinger PHP mail())
// Set your admin recipient email below:
define('ADMIN_EMAIL', getenv('ADMIN_EMAIL') ?: 'contact@zeroqueries.com');
define('SYSTEM_SENDER_EMAIL', getenv('SYSTEM_SENDER_EMAIL') ?: 'no-reply@zeroqueries.com');

// Fallback JSON file path
define('DATA_FILE', __DIR__ . '/data/blogs.json');

// Auto-installer with Permanent Data Protection:
// When you deploy fresh build files via FileZilla, your MySQL database is NEVER wiped or overwritten!
function init_db_if_needed($pdo) {
    if (!$pdo) return;
    try {
        // 1. Check if 'blogs' table exists
        $check = $pdo->query("SHOW TABLES LIKE 'blogs'");
        if ($check->rowCount() === 0) {
            // Table doesn't exist yet (Day 1 First Setup): Create table
            $sql = "CREATE TABLE IF NOT EXISTS `blogs` (
                `id` INT AUTO_INCREMENT PRIMARY KEY,
                `slug` VARCHAR(255) NOT NULL UNIQUE,
                `category` VARCHAR(100) NOT NULL DEFAULT 'case-studies',
                `category_en` VARCHAR(150) NOT NULL DEFAULT 'Case Studies',
                `category_ar` VARCHAR(150) NOT NULL DEFAULT 'قصص نجاح',
                `title_en` VARCHAR(500) NOT NULL,
                `title_ar` VARCHAR(500) NOT NULL,
                `subtitle_en` TEXT DEFAULT NULL,
                `subtitle_ar` TEXT DEFAULT NULL,
                `excerpt_en` TEXT DEFAULT NULL,
                `excerpt_ar` TEXT DEFAULT NULL,
                `read_time_en` VARCHAR(100) DEFAULT '6 min read',
                `read_time_ar` VARCHAR(100) DEFAULT 'قراءة 6 دقائق',
                `date_en` VARCHAR(100) DEFAULT NULL,
                `date_ar` VARCHAR(100) DEFAULT NULL,
                `image` VARCHAR(1000) DEFAULT NULL,
                `hero_image` VARCHAR(1000) DEFAULT NULL,
                `is_featured` TINYINT(1) DEFAULT 0,
                `sidebar` LONGTEXT DEFAULT NULL,
                `content_en` LONGTEXT DEFAULT NULL,
                `content_ar` LONGTEXT DEFAULT NULL,
                `quote_en` LONGTEXT DEFAULT NULL,
                `quote_ar` LONGTEXT DEFAULT NULL,
                `results_en` LONGTEXT DEFAULT NULL,
                `results_ar` LONGTEXT DEFAULT NULL,
                `faqs` LONGTEXT DEFAULT NULL,
                `related_posts` LONGTEXT DEFAULT NULL,
                `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
                `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                INDEX `idx_slug` (`slug`),
                INDEX `idx_category` (`category`),
                INDEX `idx_featured` (`is_featured`)
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;";
            $pdo->exec($sql);

            // 2. Only seed default articles on Day 1 when table was freshly created
            if (file_exists(DATA_FILE)) {
                $content = file_get_contents(DATA_FILE);
                $seed_blogs = json_decode($content, true);
                if (is_array($seed_blogs) && count($seed_blogs) > 0) {
                    $insert_sql = "INSERT IGNORE INTO `blogs` (
                        `slug`, `category`, `category_en`, `category_ar`,
                        `title_en`, `title_ar`,
                        `subtitle_en`, `subtitle_ar`,
                        `excerpt_en`, `excerpt_ar`,
                        `read_time_en`, `read_time_ar`,
                        `date_en`, `date_ar`,
                        `image`, `hero_image`,
                        `is_featured`,
                        `sidebar`, `content_en`, `content_ar`,
                        `quote_en`, `quote_ar`,
                        `results_en`, `results_ar`,
                        `faqs`, `related_posts`
                    ) VALUES (
                        :slug, :category, :category_en, :category_ar,
                        :title_en, :title_ar,
                        :subtitle_en, :subtitle_ar,
                        :excerpt_en, :excerpt_ar,
                        :read_time_en, :read_time_ar,
                        :date_en, :date_ar,
                        :image, :hero_image,
                        :is_featured,
                        :sidebar, :content_en, :content_ar,
                        :quote_en, :quote_ar,
                        :results_en, :results_ar,
                        :faqs, :related_posts
                    )";
                    $stmt = $pdo->prepare($insert_sql);
                    foreach ($seed_blogs as $b) {
                        $stmt->execute([
                            ':slug' => $b['slug'],
                            ':category' => $b['category'] ?? 'case-studies',
                            ':category_en' => $b['categoryEn'] ?? 'Case Studies',
                            ':category_ar' => $b['categoryAr'] ?? 'قصص نجاح',
                            ':title_en' => $b['titleEn'] ?? '',
                            ':title_ar' => $b['titleAr'] ?? '',
                            ':subtitle_en' => $b['subtitleEn'] ?? '',
                            ':subtitle_ar' => $b['subtitleAr'] ?? '',
                            ':excerpt_en' => $b['excerptEn'] ?? '',
                            ':excerpt_ar' => $b['excerptAr'] ?? '',
                            ':read_time_en' => $b['readTimeEn'] ?? '6 min read',
                            ':read_time_ar' => $b['readTimeAr'] ?? 'قراءة 6 دقائق',
                            ':date_en' => $b['dateEn'] ?? '',
                            ':date_ar' => $b['dateAr'] ?? '',
                            ':image' => $b['image'] ?? '',
                            ':hero_image' => $b['heroImage'] ?? ($b['image'] ?? ''),
                            ':is_featured' => !empty($b['isFeatured']) ? 1 : 0,
                            ':sidebar' => isset($b['sidebar']) ? json_encode($b['sidebar'], JSON_UNESCAPED_UNICODE) : null,
                            ':content_en' => isset($b['contentEn']) ? json_encode($b['contentEn'], JSON_UNESCAPED_UNICODE) : null,
                            ':content_ar' => isset($b['contentAr']) ? json_encode($b['contentAr'], JSON_UNESCAPED_UNICODE) : null,
                            ':quote_en' => isset($b['quoteEn']) ? json_encode($b['quoteEn'], JSON_UNESCAPED_UNICODE) : null,
                            ':quote_ar' => isset($b['quoteAr']) ? json_encode($b['quoteAr'], JSON_UNESCAPED_UNICODE) : null,
                            ':results_en' => isset($b['resultsEn']) ? json_encode($b['resultsEn'], JSON_UNESCAPED_UNICODE) : null,
                            ':results_ar' => isset($b['resultsAr']) ? json_encode($b['resultsAr'], JSON_UNESCAPED_UNICODE) : null,
                            ':faqs' => isset($b['faqs']) ? json_encode($b['faqs'], JSON_UNESCAPED_UNICODE) : null,
                            ':related_posts' => isset($b['relatedPosts']) ? json_encode($b['relatedPosts'], JSON_UNESCAPED_UNICODE) : null,
                        ]);
                    }
                }
            }
        }

        // 3. Auto-create Contact, Demo, and Newsletter tables if they do not exist
        $pdo->exec("CREATE TABLE IF NOT EXISTS `contact_inquiries` (
            `id` INT AUTO_INCREMENT PRIMARY KEY,
            `first_name` VARCHAR(255) NOT NULL,
            `last_name` VARCHAR(255) DEFAULT '',
            `email` VARCHAR(255) NOT NULL,
            `phone` VARCHAR(100) DEFAULT '',
            `topic` VARCHAR(255) DEFAULT 'General Inquiry',
            `message` TEXT NOT NULL,
            `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;");

        $pdo->exec("CREATE TABLE IF NOT EXISTS `demo_requests` (
            `id` INT AUTO_INCREMENT PRIMARY KEY,
            `full_name` VARCHAR(255) NOT NULL,
            `work_email` VARCHAR(255) NOT NULL,
            `organization` VARCHAR(255) NOT NULL,
            `role` VARCHAR(255) DEFAULT '',
            `data_environment` VARCHAR(255) DEFAULT '',
            `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;");

        $pdo->exec("CREATE TABLE IF NOT EXISTS `newsletter_subscribers` (
            `id` INT AUTO_INCREMENT PRIMARY KEY,
            `email` VARCHAR(255) NOT NULL UNIQUE,
            `status` VARCHAR(50) DEFAULT 'active',
            `subscribed_at` DATETIME DEFAULT CURRENT_TIMESTAMP
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;");
    } catch (Exception $e) {
        error_log("Database auto-init error: " . $e->getMessage());
    }
}

// Get PDO Database Connection (Returns PDO or null)
function get_db_connection() {
    static $pdo = null;
    static $checked = false;
    if ($pdo !== null) return $pdo;
    if ($checked) return null;

    if (empty(DB_NAME)) {
        $checked = true;
        return null;
    }

    try {
        $dsn = "mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=" . DB_CHARSET;
        $options = [
            PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES   => false,
        ];
        $pdo = new PDO($dsn, DB_USER, DB_PASS, $options);
        // Automatically create table & seed data on first connect
        init_db_if_needed($pdo);
        return $pdo;
    } catch (PDOException $e) {
        // Fall back seamlessly to JSON file storage if MySQL is not available
        $checked = true;
        error_log("MySQL Connection failed (using JSON fallback): " . $e->getMessage());
        return null;
    }
}

// Convert DB row to frontend blog structure
function format_db_row($row) {
    if (!$row) return null;

    $sidebar = !empty($row['sidebar']) ? json_decode($row['sidebar'], true) : null;
    $content_en = !empty($row['content_en']) ? json_decode($row['content_en'], true) : null;
    $content_ar = !empty($row['content_ar']) ? json_decode($row['content_ar'], true) : null;
    $quote_en = !empty($row['quote_en']) ? json_decode($row['quote_en'], true) : null;
    $quote_ar = !empty($row['quote_ar']) ? json_decode($row['quote_ar'], true) : null;
    $results_en = !empty($row['results_en']) ? json_decode($row['results_en'], true) : null;
    $results_ar = !empty($row['results_ar']) ? json_decode($row['results_ar'], true) : null;
    $faqs = !empty($row['faqs']) ? json_decode($row['faqs'], true) : null;
    $related_posts = !empty($row['related_posts']) ? json_decode($row['related_posts'], true) : null;

    return [
        'id'            => (int)$row['id'],
        'slug'          => $row['slug'],
        'category'      => $row['category'],
        'categoryEn'    => $row['category_en'] ?? $row['category'],
        'categoryAr'    => $row['category_ar'] ?? $row['category'],
        'titleEn'       => $row['title_en'],
        'titleAr'       => $row['title_ar'],
        'subtitleEn'    => $row['subtitle_en'],
        'subtitleAr'    => $row['subtitle_ar'],
        'excerptEn'     => $row['excerpt_en'],
        'excerptAr'     => $row['excerpt_ar'],
        'readTimeEn'    => $row['read_time_en'],
        'readTimeAr'    => $row['read_time_ar'],
        'dateEn'        => $row['date_en'],
        'dateAr'        => $row['date_ar'],
        'image'         => $row['image'],
        'heroImage'     => $row['hero_image'] ?: $row['image'],
        'isFeatured'    => (bool)$row['is_featured'],
        'sidebar'       => $sidebar,
        'contentEn'     => $content_en,
        'contentAr'     => $content_ar,
        'quoteEn'       => $quote_en,
        'quoteAr'       => $quote_ar,
        'resultsEn'     => $results_en,
        'resultsAr'     => $results_ar,
        'faqs'          => $faqs,
        'relatedPosts'  => $related_posts,
        'createdAt'     => $row['created_at'],
        'updatedAt'     => $row['updated_at'] ?? $row['created_at']
    ];
}

// Read all blogs (MySQL or JSON fallback)
function get_all_blogs() {
    $pdo = get_db_connection();
    if ($pdo) {
        $stmt = $pdo->query("SELECT * FROM `blogs` ORDER BY `id` DESC");
        $rows = $stmt->fetchAll();
        return array_map('format_db_row', $rows);
    }

    if (!file_exists(DATA_FILE)) {
        return [];
    }
    $content = file_get_contents(DATA_FILE);
    $data = json_decode($content, true);
    return is_array($data) ? $data : [];
}

// Find single blog by slug
function find_blog($slug_or_id) {
    $pdo = get_db_connection();
    if ($pdo) {
        $stmt = $pdo->prepare("SELECT * FROM `blogs` WHERE `slug` = :slug OR `id` = :id LIMIT 1");
        $stmt->execute([':slug' => $slug_or_id, ':id' => $slug_or_id]);
        $row = $stmt->fetch();
        return $row ? format_db_row($row) : null;
    }

    $blogs = get_all_blogs();
    foreach ($blogs as $blog) {
        if ((isset($blog['slug']) && $blog['slug'] === $slug_or_id) || (isset($blog['id']) && (string)$blog['id'] === (string)$slug_or_id)) {
            return $blog;
        }
    }
    return null;
}

// Save all blogs (Used for JSON fallback)
function save_all_blogs($blogs) {
    if (!is_dir(__DIR__ . '/data')) {
        mkdir(__DIR__ . '/data', 0755, true);
    }
    return file_put_contents(DATA_FILE, json_encode($blogs, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
}

// Helper to generate a clean URL slug from English title
function slugify($text) {
    $text = preg_replace('~[^\pL\d]+~u', '-', $text);
    $text = iconv('utf-8', 'us-ascii//TRANSLIT', $text);
    $text = preg_replace('~[^-\w]+~', '', $text);
    $text = trim($text, '-');
    $text = preg_replace('~-+~', '-', $text);
    $text = strtolower($text);
    return empty($text) ? 'article-' . time() : $text;
}

// Send standard JSON response
function json_response($data, $status = 200) {
    http_response_code($status);
    echo json_encode($data, JSON_UNESCAPED_UNICODE);
    exit();
}

// Mail Dispatcher using PHP mail()
function send_system_mail($to, $subject, $html_body, $reply_to = null) {
    if (empty($to) || !filter_var($to, FILTER_VALIDATE_EMAIL)) {
        return false;
    }

    $headers = [];
    $headers[] = 'MIME-Version: 1.0';
    $headers[] = 'Content-type: text/html; charset=UTF-8';
    $headers[] = 'From: ZeroQueries <' . SYSTEM_SENDER_EMAIL . '>';
    if ($reply_to && filter_var($reply_to, FILTER_VALIDATE_EMAIL)) {
        $headers[] = 'Reply-To: ' . $reply_to;
    }
    $headers[] = 'X-Mailer: PHP/' . phpversion();

    $header_str = implode("\r\n", $headers);

    return @mail($to, $subject, $html_body, $header_str);
}
