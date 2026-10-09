-- ========================================================
-- ZeroQueries Blog Database Schema for Hostinger (MySQL)
-- Charset: utf8mb4 (Full multilingual & Arabic support)
-- Compatible with Hostinger phpMyAdmin, MySQL 5.7+, and MariaDB
-- ========================================================

-- Drop existing table if recreating
-- DROP TABLE IF EXISTS `blogs`;

CREATE TABLE IF NOT EXISTS `blogs` (
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
    
    -- Rich Modular Structured Data (JSON / LONGTEXT)
    `sidebar` LONGTEXT DEFAULT NULL COMMENT 'JSON array of Case Overview metadata (detailsEn & detailsAr)',
    `content_en` LONGTEXT DEFAULT NULL COMMENT 'JSON object with about, challenge, solution (English)',
    `content_ar` LONGTEXT DEFAULT NULL COMMENT 'JSON object with about, challenge, solution (Arabic)',
    `quote_en` LONGTEXT DEFAULT NULL COMMENT 'JSON object with quote text, author, and role (English)',
    `quote_ar` LONGTEXT DEFAULT NULL COMMENT 'JSON object with quote text, author, and role (Arabic)',
    `results_en` LONGTEXT DEFAULT NULL COMMENT 'JSON array of 4 measurable metrics (English)',
    `results_ar` LONGTEXT DEFAULT NULL COMMENT 'JSON array of 4 measurable metrics (Arabic)',
    `faqs` LONGTEXT DEFAULT NULL COMMENT 'JSON array of bilingual FAQs',
    `related_posts` LONGTEXT DEFAULT NULL COMMENT 'JSON array of related articles',

    `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
    `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    INDEX `idx_slug` (`slug`),
    INDEX `idx_category` (`category`),
    INDEX `idx_featured` (`is_featured`),
    INDEX `idx_created` (`created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ========================================================
-- Seed Initial Case Study Article
-- ========================================================
INSERT INTO `blogs` (
    `slug`, `category`, `category_en`, `category_ar`,
    `title_en`, `title_ar`,
    `subtitle_en`, `subtitle_ar`,
    `excerpt_en`, `excerpt_ar`,
    `read_time_en`, `read_time_ar`,
    `date_en`, `date_ar`,
    `image`, `hero_image`,
    `is_featured`,
    `sidebar`,
    `content_en`,
    `content_ar`,
    `quote_en`,
    `quote_ar`,
    `results_en`,
    `results_ar`,
    `faqs`
) VALUES (
    'game-changer-retail',
    'case-studies',
    'Case Studies',
    'قصص نجاح',
    'Game Changer: How Global Retailers Empower Teams with Instant Natural Language Data Access',
    'نقطة تحول: كيف تُمكّن شركات التجزئة العالمية فرق عملها بالوصول الفوري للبيانات عبر اللغة الطبيعية',
    'Discover how modern commerce operations transformed their data culture, enabling everyone from the CEO to customer service to get instant, verified answers without waiting on the data team.',
    'اكتشف كيف غيرت شركات التجارة الحديثة ثقافة البيانات لديها، مما أتاح للجميع بدءاً من الرئيس التنفيذي وحتى خدمة العملاء الحصول على إجابات فورية وموثقة دون انتظار فريق تحليل البيانات.',
    'Discover how modern commerce operations transformed their data culture, enabling everyone from the CEO to customer service to get instant, verified answers without waiting on the data team.',
    'اكتشف كيف غيرت شركات التجارة الحديثة ثقافة البيانات لديها، مما أتاح للجميع بدءاً من الرئيس التنفيذي وحتى خدمة العملاء الحصول على إجابات فورية وموثقة دون انتظار فريق تحليل البيانات.',
    '6 min read',
    'قراءة 6 دقائق',
    'May 21, 2026',
    '21 مايو 2026',
    'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=1200',
    'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=1200',
    0,
    '{"detailsEn":[{"label":"Company","value":"Global Retail Commerce"},{"label":"Location","value":"London, UK & Dubai, UAE"},{"label":"Industry","value":"Retail / E-commerce"},{"label":"Team Size","value":"250+ employees"},{"label":"Data Warehouse","value":"BigQuery & Snowflake"},{"label":"Platform","value":"ZeroQueries Enterprise"}],"detailsAr":[{"label":"الشركة","value":"التجارة العالمية للتجزئة"},{"label":"المقر","value":"لندن، المملكة المتحدة ودبي، الإمارات"},{"label":"القطاع","value":"التجزئة والتجارة الإلكترونية"},{"label":"حجم الفريق","value":"أكثر من 250 موظف"},{"label":"مستودع البيانات","value":"BigQuery و Snowflake"},{"label":"المنصة","value":"ZeroQueries للمؤسسات"}]}',
    '{"aboutTitle":"About the Company","about":"Operating across multiple international markets with thousands of unique product lines and rapidly moving inventory, data drives every operational milestone. Managing global logistics, setting regional pricing, and optimizing supply chain margins requires immediate access to live enterprise metrics.","challengeTitle":"The Challenge: Static Dashboards and Reporting Delays","challenges":["With inventory spread across multiple distribution centres, decision-makers frequently faced high reporting friction. Traditional dashboards were rigid and static. Whenever a manager needed a follow-up answer, they were forced to export rows to Excel or submit an ad-hoc query request to the already overstretched BI engineering queue.","The backlog of data requests was growing by double digits each month, slowing down commercial decision velocity."],"solutionTitle":"The Solution with ZeroQueries","solutions":["The enterprise connected their primary BigQuery and Snowflake warehouses directly to ZeroQueries with zero pipeline rebuilds. Within minutes, schema-grounded deterministic AI was configured to comprehend their specific corporate metrics, product hierarchies, and SKU taxonomies.","Teams in Slack and WhatsApp began asking everyday business questions directly in natural language. Instead of waiting days for custom dashboards, executives and store managers received live, mathematically verified tables and visual breakdowns in seconds."]}',
    '{"aboutTitle":"عن المؤسسة","about":"مع إدارة عمليات تجارية عبر عدة أسواق دولية وآلاف المنتجات ومخزون سريع الدوران، تشكل البيانات المحرك الأساسي لكل قرار تشغيلي. وتتطلب إدارة سلاسل الإمداد العالمية وضبط هوامش التسعير وصولاً فورياً لمؤشرات الأداء المؤسسية.","challengeTitle":"التحدي: لوحات التحكم الثابتة وتأخر التقارير","challenges":["مع توزيع المخزون عبر مراكز لوجستية متعددة، واجه صناع القرار تباطؤاً ملحوظاً في الحصول على الإجابات. كانت لوحات التحكم التقليدية ثابتة وجامدة، وكان أي سؤال إضافي يتطلب تصدير البيانات إلى Excel أو تقديم طلب استعلام لفريق مهندسي البيانات المثقل بالأعباء.","كانت قائمة طلبات الاستعلام المؤجلة تتزايد بشكل مستمر، مما أعاق سرعة اتخاذ القرارات التجارية الحاسمة."],"solutionTitle":"الحل مع ZeroQueries","solutions":["قامت المؤسسة بربط مستودعات BigQuery وSnowflake مباشرة بـ ZeroQueries دون الحاجة لإعادة بناء أي خطوط نقل بيانات. وخلال دقائق، تم تكوين الذكاء الاصطناعي المثبت على المخططات لفهم مقاييس الأعمال وهيكل المنتجات بدقة.","بدأت الفرق في سلاك وواتساب بطرح أسئلة الأعمال بلغة حوارية عادية. وبدلاً من الانتظار لعدة أيام، تلقى المديرون إجابات دقيقة وموثقة حسابياً مع رسوم بيانية ملخصة في ثوانٍ معدودة."]}',
    '{"text":"ZeroQueries broke down the communication silos between our business units. Our leadership and department managers can now interrogate live numbers in seconds right from our everyday chat channels without writing a single line of SQL.","author":"Mark McQuade","role":"Commercial Finance Director"}',
    '{"text":"قضى ZeroQueries على الحواجز التي كانت تفصل بين إداراتنا. أصبح بإمكان قيادتنا ومديري الأقسام الآن استجواب الأرقام الحية في ثوانٍ مباشرة من قنوات المحادثة اليومية دون كتابة سطر واحد من كود SQL.","author":"مارك ماكويد","role":"مدير الشؤون المالية التجارية"}',
    '[{"title":"Sub-Second Answers","desc":"Direct answers without waiting on the data team","icon":"⚡"},{"title":"80% Backlog Reduction","desc":"Data engineers freed to focus on high-value models","icon":"⚙️"},{"title":"Slack & WhatsApp Native","desc":"Peer-to-peer insights shared across teams instantly","icon":"💬"},{"title":"100% Zero-Training","desc":"Strict ephemeral memory execution with zero retention","icon":"🔒"}]',
    '[{"title":"إجابات بأقل من ثانية","desc":"إجابات مباشرة دون انتظار فريق البيانات","icon":"⚡"},{"title":"خفض 80٪ من التراكم","desc":"تحرير مهندسي البيانات للتركيز على النماذج الاستراتيجية","icon":"⚙️"},{"title":"مدمج في سلاك وواتساب","desc":"مشاركة التحليلات بين الفرق بلحظات","icon":"💬"},{"title":"أمان 100٪ دون تدريب","desc":"تنفيذ لحظي في الذاكرة مع عدم الاحتفاظ بالبيانات","icon":"🔒"}]',
    '[{"questionEn":"How long did it take to deploy ZeroQueries across the enterprise warehouse?","questionAr":"كم استغرق نشر ZeroQueries عبر مستودع بيانات المؤسسة؟","answerEn":"The full integration was completed in less than one business day. Because ZeroQueries connects directly to BigQuery and Snowflake without rebuilding existing data pipelines or replicating tables, non-technical teams were querying live numbers by afternoon.","answerAr":"تم اكتمال الربط بالكامل في أقل من يوم عمل واحد. نظراً لأن ZeroQueries يتصل مباشرة بـ BigQuery وSnowflake دون الحاجة لإعادة بناء خطوط نقل البيانات أو نسخ الجداول، بدأت الفرق غير التقنية بالاستعلام بعد الظهر مباشرة."},{"questionEn":"Does ZeroQueries train AI models on our proprietary corporate data?","questionAr":"هل يقوم ZeroQueries بتدريب نماذج الذكاء الاصطناعي على بيانات شركتنا الخاصة؟","answerEn":"Never. ZeroQueries operates under a strict zero-retention commercial policy. All natural language SQL generation and validation occurs ephemerally in RAM within private VPC parameters, ensuring customer data is never retained or used for public training.","answerAr":"مستحيل تماماً. يعمل ZeroQueries وفق سياسة تجارية صارمة لعدم الاحتفاظ بالبيانات نهائياً. يتم إنشاء استعلامات SQL الحتمية والتحقق منها مؤقتاً في الذاكرة العشوائية RAM داخل بيئة سحابية خاصة، مما يضمن عدم حفظ بيانات العملاء أو استخدامها في التدريب."}]'
) ON DUPLICATE KEY UPDATE `title_en` = VALUES(`title_en`);

-- ========================================================
-- Contact Inquiries Table
-- ========================================================
CREATE TABLE IF NOT EXISTS `contact_inquiries` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `first_name` VARCHAR(255) NOT NULL,
    `last_name` VARCHAR(255) DEFAULT '',
    `email` VARCHAR(255) NOT NULL,
    `phone` VARCHAR(100) DEFAULT '',
    `topic` VARCHAR(255) DEFAULT 'General Inquiry',
    `message` TEXT NOT NULL,
    `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
    INDEX `idx_email` (`email`),
    INDEX `idx_created` (`created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ========================================================
-- Demo Booking Requests Table
-- ========================================================
CREATE TABLE IF NOT EXISTS `demo_requests` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `full_name` VARCHAR(255) NOT NULL,
    `work_email` VARCHAR(255) NOT NULL,
    `organization` VARCHAR(255) NOT NULL,
    `role` VARCHAR(255) DEFAULT '',
    `data_environment` VARCHAR(255) DEFAULT '',
    `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
    INDEX `idx_email` (`work_email`),
    INDEX `idx_created` (`created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ========================================================
-- Newsletter Subscribers Table
-- ========================================================
CREATE TABLE IF NOT EXISTS `newsletter_subscribers` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `email` VARCHAR(255) NOT NULL UNIQUE,
    `status` VARCHAR(50) DEFAULT 'active',
    `subscribed_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
    INDEX `idx_email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
