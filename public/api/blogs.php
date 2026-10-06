<?php
// ZeroQueries Blog API Endpoint
// Handles GET, POST, PUT, DELETE for blogs on Hostinger (MySQL or JSON)

require_once __DIR__ . '/config.php';

$method = $_SERVER['REQUEST_METHOD'];
$slug_param = isset($_GET['slug']) ? trim($_GET['slug']) : null;
$category_param = isset($_GET['category']) ? trim($_GET['category']) : null;
$search_param = isset($_GET['search']) ? trim($_GET['search']) : null;

// Smart slug detection for clean URLs or PATH_INFO
if (empty($slug_param) && !empty($_SERVER['PATH_INFO'])) {
    $slug_param = trim($_SERVER['PATH_INFO'], '/');
}
if (empty($slug_param) && !empty($_SERVER['REQUEST_URI'])) {
    $uri_path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
    if (preg_match('#/(?:api/)?blogs(?:\.php)?/([^/?#]+)#i', $uri_path, $matches)) {
        $slug_param = urldecode($matches[1]);
    }
}

$pdo = get_db_connection();

// ==========================================
// 1. GET: Fetch All or Single Post
// ==========================================
if ($method === 'GET') {
    // If slug requested, return single post
    if (!empty($slug_param)) {
        $blog = find_blog($slug_param);
        if ($blog) {
            json_response([
                'success' => true,
                'data' => $blog
            ]);
        } else {
            json_response([
                'success' => false,
                'error' => 'Blog post not found'
            ], 404);
        }
    }

    // Otherwise, return list
    $blogs = get_all_blogs();

    // Category filter
    if (!empty($category_param) && $category_param !== 'all') {
        $blogs = array_values(array_filter($blogs, function ($b) use ($category_param) {
            return isset($b['category']) && $b['category'] === $category_param;
        }));
    }

    // Search filter
    if (!empty($search_param)) {
        $query = strtolower($search_param);
        $blogs = array_values(array_filter($blogs, function ($b) use ($query) {
            $tEn = isset($b['titleEn']) ? strtolower($b['titleEn']) : '';
            $tAr = isset($b['titleAr']) ? $b['titleAr'] : '';
            $slug = isset($b['slug']) ? strtolower($b['slug']) : '';
            return strpos($tEn, $query) !== false || strpos($tAr, $query) !== false || strpos($slug, $query) !== false;
        }));
    }

    json_response([
        'success' => true,
        'total' => count($blogs),
        'data' => $blogs
    ]);
}

// ==========================================
// 2. POST: Create New Blog Post
// ==========================================
if ($method === 'POST') {
    $raw_input = file_get_contents('php://input');
    $input = json_decode($raw_input, true);

    if (!$input || (!isset($input['titleEn']) && !isset($input['titleAr']))) {
        json_response([
            'success' => false,
            'error' => 'Article title (English or Arabic) is required'
        ], 400);
    }

    // Determine or generate slug
    $slug = !empty($input['slug']) ? slugify($input['slug']) : slugify($input['titleEn'] ?? 'article');
    $unique_slug = $slug;
    $counter = 1;
    while (find_blog($unique_slug) !== null) {
        $unique_slug = $slug . '-' . $counter;
        $counter++;
    }

    // If MySQL is connected
    if ($pdo) {
        try {
            $sql = "INSERT INTO `blogs` (
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

            $stmt = $pdo->prepare($sql);
            $stmt->execute([
                ':slug' => $unique_slug,
                ':category' => $input['category'] ?? 'product',
                ':category_en' => $input['categoryEn'] ?? 'Product',
                ':category_ar' => $input['categoryAr'] ?? 'المنتج',
                ':title_en' => $input['titleEn'] ?? '',
                ':title_ar' => $input['titleAr'] ?? '',
                ':subtitle_en' => $input['subtitleEn'] ?? '',
                ':subtitle_ar' => $input['subtitleAr'] ?? '',
                ':excerpt_en' => $input['excerptEn'] ?? '',
                ':excerpt_ar' => $input['excerptAr'] ?? '',
                ':read_time_en' => $input['readTimeEn'] ?? '5 min read',
                ':read_time_ar' => $input['readTimeAr'] ?? 'قراءة 5 دقائق',
                ':date_en' => $input['dateEn'] ?? date('F d, Y'),
                ':date_ar' => $input['dateAr'] ?? date('Y-m-d'),
                ':image' => $input['image'] ?? '',
                ':hero_image' => $input['heroImage'] ?? ($input['image'] ?? ''),
                ':is_featured' => !empty($input['isFeatured']) ? 1 : 0,
                ':sidebar' => isset($input['sidebar']) ? json_encode($input['sidebar'], JSON_UNESCAPED_UNICODE) : null,
                ':content_en' => isset($input['contentEn']) ? json_encode($input['contentEn'], JSON_UNESCAPED_UNICODE) : null,
                ':content_ar' => isset($input['contentAr']) ? json_encode($input['contentAr'], JSON_UNESCAPED_UNICODE) : null,
                ':quote_en' => isset($input['quoteEn']) ? json_encode($input['quoteEn'], JSON_UNESCAPED_UNICODE) : null,
                ':quote_ar' => isset($input['quoteAr']) ? json_encode($input['quoteAr'], JSON_UNESCAPED_UNICODE) : null,
                ':results_en' => isset($input['resultsEn']) ? json_encode($input['resultsEn'], JSON_UNESCAPED_UNICODE) : null,
                ':results_ar' => isset($input['resultsAr']) ? json_encode($input['resultsAr'], JSON_UNESCAPED_UNICODE) : null,
                ':faqs' => isset($input['faqs']) ? json_encode($input['faqs'], JSON_UNESCAPED_UNICODE) : null,
                ':related_posts' => isset($input['relatedPosts']) ? json_encode($input['relatedPosts'], JSON_UNESCAPED_UNICODE) : null,
            ]);

            $created_post = find_blog($unique_slug);
            json_response([
                'success' => true,
                'message' => 'Blog post created successfully in MySQL',
                'data' => $created_post
            ], 201);
        } catch (PDOException $e) {
            json_response([
                'success' => false,
                'error' => 'MySQL Insert error: ' . $e->getMessage()
            ], 500);
        }
    }

    // JSON file fallback
    $blogs = get_all_blogs();
    $max_id = 0;
    foreach ($blogs as $b) {
        if (isset($b['id']) && (int)$b['id'] > $max_id) {
            $max_id = (int)$b['id'];
        }
    }

    $new_post = array_merge($input, [
        'id' => $max_id + 1,
        'slug' => $unique_slug,
        'createdAt' => date('c'),
        'updatedAt' => date('c')
    ]);

    array_unshift($blogs, $new_post);
    save_all_blogs($blogs);

    json_response([
        'success' => true,
        'message' => 'Blog post created successfully',
        'data' => $new_post
    ], 201);
}

// ==========================================
// 3. PUT: Update Existing Blog Post
// ==========================================
if ($method === 'PUT') {
    if (empty($slug_param)) {
        json_response([
            'success' => false,
            'error' => 'Article slug parameter is required for update'
        ], 400);
    }

    $raw_input = file_get_contents('php://input');
    $input = json_decode($raw_input, true);

    if (!$input) {
        json_response([
            'success' => false,
            'error' => 'Invalid JSON payload'
        ], 400);
    }

    // MySQL Update
    if ($pdo) {
        try {
            $existing = find_blog($slug_param);
            if (!$existing) {
                json_response([
                    'success' => false,
                    'error' => 'Blog post not found to update'
                ], 404);
            }

            $sql = "UPDATE `blogs` SET 
                `title_en` = :title_en,
                `title_ar` = :title_ar,
                `subtitle_en` = :subtitle_en,
                `subtitle_ar` = :subtitle_ar,
                `excerpt_en` = :excerpt_en,
                `excerpt_ar` = :excerpt_ar,
                `category` = :category,
                `category_en` = :category_en,
                `category_ar` = :category_ar,
                `read_time_en` = :read_time_en,
                `read_time_ar` = :read_time_ar,
                `date_en` = :date_en,
                `date_ar` = :date_ar,
                `image` = :image,
                `hero_image` = :hero_image,
                `is_featured` = :is_featured,
                `sidebar` = :sidebar,
                `content_en` = :content_en,
                `content_ar` = :content_ar,
                `quote_en` = :quote_en,
                `quote_ar` = :quote_ar,
                `results_en` = :results_en,
                `results_ar` = :results_ar,
                `faqs` = :faqs,
                `related_posts` = :related_posts
                WHERE `slug` = :target_slug OR `id` = :target_id";

            $stmt = $pdo->prepare($sql);
            $stmt->execute([
                ':target_slug' => $slug_param,
                ':target_id' => $slug_param,
                ':title_en' => $input['titleEn'] ?? $existing['titleEn'],
                ':title_ar' => $input['titleAr'] ?? $existing['titleAr'],
                ':subtitle_en' => $input['subtitleEn'] ?? $existing['subtitleEn'],
                ':subtitle_ar' => $input['subtitleAr'] ?? $existing['subtitleAr'],
                ':excerpt_en' => $input['excerptEn'] ?? $existing['excerptEn'],
                ':excerpt_ar' => $input['excerptAr'] ?? $existing['excerptAr'],
                ':category' => $input['category'] ?? $existing['category'],
                ':category_en' => $input['categoryEn'] ?? $existing['categoryEn'],
                ':category_ar' => $input['categoryAr'] ?? $existing['categoryAr'],
                ':read_time_en' => $input['readTimeEn'] ?? $existing['readTimeEn'],
                ':read_time_ar' => $input['readTimeAr'] ?? $existing['readTimeAr'],
                ':date_en' => $input['dateEn'] ?? $existing['dateEn'],
                ':date_ar' => $input['dateAr'] ?? $existing['dateAr'],
                ':image' => $input['image'] ?? $existing['image'],
                ':hero_image' => $input['heroImage'] ?? ($input['image'] ?? $existing['heroImage']),
                ':is_featured' => !empty($input['isFeatured']) ? 1 : 0,
                ':sidebar' => isset($input['sidebar']) ? json_encode($input['sidebar'], JSON_UNESCAPED_UNICODE) : json_encode($existing['sidebar'], JSON_UNESCAPED_UNICODE),
                ':content_en' => isset($input['contentEn']) ? json_encode($input['contentEn'], JSON_UNESCAPED_UNICODE) : json_encode($existing['contentEn'], JSON_UNESCAPED_UNICODE),
                ':content_ar' => isset($input['contentAr']) ? json_encode($input['contentAr'], JSON_UNESCAPED_UNICODE) : json_encode($existing['contentAr'], JSON_UNESCAPED_UNICODE),
                ':quote_en' => isset($input['quoteEn']) ? json_encode($input['quoteEn'], JSON_UNESCAPED_UNICODE) : json_encode($existing['quoteEn'], JSON_UNESCAPED_UNICODE),
                ':quote_ar' => isset($input['quoteAr']) ? json_encode($input['quoteAr'], JSON_UNESCAPED_UNICODE) : json_encode($existing['quoteAr'], JSON_UNESCAPED_UNICODE),
                ':results_en' => isset($input['resultsEn']) ? json_encode($input['resultsEn'], JSON_UNESCAPED_UNICODE) : json_encode($existing['resultsEn'], JSON_UNESCAPED_UNICODE),
                ':results_ar' => isset($input['resultsAr']) ? json_encode($input['resultsAr'], JSON_UNESCAPED_UNICODE) : json_encode($existing['resultsAr'], JSON_UNESCAPED_UNICODE),
                ':faqs' => isset($input['faqs']) ? json_encode($input['faqs'], JSON_UNESCAPED_UNICODE) : json_encode($existing['faqs'], JSON_UNESCAPED_UNICODE),
                ':related_posts' => isset($input['relatedPosts']) ? json_encode($input['relatedPosts'], JSON_UNESCAPED_UNICODE) : json_encode($existing['relatedPosts'], JSON_UNESCAPED_UNICODE),
            ]);

            $updated = find_blog($slug_param);
            json_response([
                'success' => true,
                'message' => 'Blog post updated successfully in MySQL',
                'data' => $updated
            ]);
        } catch (PDOException $e) {
            json_response([
                'success' => false,
                'error' => 'MySQL Update error: ' . $e->getMessage()
            ], 500);
        }
    }

    // JSON file fallback
    $blogs = get_all_blogs();
    $found_index = -1;

    foreach ($blogs as $idx => $b) {
        if ((isset($b['slug']) && $b['slug'] === $slug_param) || (isset($b['id']) && (string)$b['id'] === (string)$slug_param)) {
            $found_index = $idx;
            break;
        }
    }

    if ($found_index === -1) {
        json_response([
            'success' => false,
            'error' => 'Blog post not found to update'
        ], 404);
    }

    $existing = $blogs[$found_index];
    $updated_post = array_merge($existing, $input, [
        'id' => $existing['id'],
        'slug' => !empty($input['slug']) ? $input['slug'] : $existing['slug'],
        'updatedAt' => date('c')
    ]);

    $blogs[$found_index] = $updated_post;
    save_all_blogs($blogs);

    json_response([
        'success' => true,
        'message' => 'Blog post updated successfully',
        'data' => $updated_post
    ]);
}

// ==========================================
// 4. DELETE: Delete Blog Post
// ==========================================
if ($method === 'DELETE') {
    if (empty($slug_param)) {
        json_response([
            'success' => false,
            'error' => 'Article slug parameter is required for deletion'
        ], 400);
    }

    if ($pdo) {
        try {
            $stmt = $pdo->prepare("DELETE FROM `blogs` WHERE `slug` = :slug OR `id` = :id");
            $stmt->execute([':slug' => $slug_param, ':id' => $slug_param]);

            if ($stmt->rowCount() > 0) {
                json_response([
                    'success' => true,
                    'message' => 'Blog post deleted successfully from MySQL'
                ]);
            } else {
                json_response([
                    'success' => false,
                    'error' => 'Blog post not found in MySQL'
                ], 404);
            }
        } catch (PDOException $e) {
            json_response([
                'success' => false,
                'error' => 'MySQL Delete error: ' . $e->getMessage()
            ], 500);
        }
    }

    $blogs = get_all_blogs();
    $initial_count = count($blogs);

    $blogs = array_values(array_filter($blogs, function ($b) use ($slug_param) {
        return (isset($b['slug']) && $b['slug'] !== $slug_param) && (isset($b['id']) && (string)$b['id'] !== (string)$slug_param);
    }));

    if (count($blogs) === $initial_count) {
        json_response([
            'success' => false,
            'error' => 'Blog post not found to delete'
        ], 404);
    }

    save_all_blogs($blogs);

    json_response([
        'success' => true,
        'message' => 'Blog post deleted successfully'
    ]);
}

// Method not allowed
json_response([
    'success' => false,
    'error' => 'Method not allowed'
], 405);
