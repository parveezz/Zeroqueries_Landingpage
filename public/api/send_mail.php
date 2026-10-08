<?php

require_once __DIR__ . '/smtp_helper.php';

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Origin, Content-Type, Accept, Authorization, X-Requested-With");

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    http_response_code(200);
    exit();
}

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    http_response_code(405);
    echo json_encode([
        "success" => false,
        "message" => "Method Not Allowed"
    ]);
    exit();
}

/*
|--------------------------------------------------------------------------
| Read Request Data
|--------------------------------------------------------------------------
| Supports both:
| 1. FormData
| 2. JSON Body
*/

$contentType = $_SERVER["CONTENT_TYPE"] ?? "";

if (strpos($contentType, "application/json") !== false) {
    $input = json_decode(file_get_contents("php://input"), true);

    if (!$input) {
        $input = [];
    }
} else {
    $input = $_POST;
}

$form_type = trim($input["form_type"] ?? "");

$recipients = ["info@invertiosolutions.com"];
$to = implode(", ", $recipients);
$subject = "";
$message = "";

/*
|--------------------------------------------------------------------------
| Newsletter
|--------------------------------------------------------------------------
*/

if ($form_type === "newsletter") {

    $email = filter_var($input["email"] ?? "", FILTER_SANITIZE_EMAIL);

    if (empty($email)) {
        http_response_code(400);
        echo json_encode([
            "success" => false,
            "message" => "Email is required."
        ]);
        exit();
    }

    $subject = "New Newsletter Subscription";

    $message =
        "Newsletter Subscription\n\n" .
        "Email: $email";

/*
|--------------------------------------------------------------------------
| Partner Form
|--------------------------------------------------------------------------
*/

} elseif ($form_type === "partner") {

    $to = "partners@zeroqueries.com";

    $companyName = htmlspecialchars(trim($input["companyName"] ?? ""));
    $website = htmlspecialchars(trim($input["website"] ?? ""));
    $contactPerson = htmlspecialchars(trim($input["contactPerson"] ?? ""));
    $email = filter_var($input["email"] ?? "", FILTER_SANITIZE_EMAIL);
    $country = htmlspecialchars(trim($input["country"] ?? ""));
    $services = htmlspecialchars(trim($input["services"] ?? ""));
    $customersCount = htmlspecialchars(trim($input["customersCount"] ?? ""));
    $industries = htmlspecialchars(trim($input["industries"] ?? ""));
    $source = htmlspecialchars(trim($input["source"] ?? ""));
    $prefDate = htmlspecialchars(trim($input["prefDate"] ?? ""));
    $prefTime = htmlspecialchars(trim($input["prefTime"] ?? ""));

    if (!$email || !$contactPerson) {
        http_response_code(400);
        echo json_encode([
            "success" => false,
            "message" => "Required fields are missing."
        ]);
        exit();
    }

    $subject = "New Partner Discussion Request";

    $message = "
Partner Discussion Request

Company Name: $companyName
Website: $website
Contact Person: $contactPerson
Email: $email
Country: $country
Services: $services
Customers Count: $customersCount
Industries: $industries
Source: $source
Preferred Date: $prefDate
Preferred Time: $prefTime
";

/*
|--------------------------------------------------------------------------
| Contact Form
|--------------------------------------------------------------------------
*/
} elseif ($form_type === "contact") {

    $firstName    = htmlspecialchars(trim($input["firstName"] ?? ""));
    $lastName     = htmlspecialchars(trim($input["lastName"] ?? ""));
    $name         = trim("$firstName $lastName");
    if (empty($name)) {
        $name = htmlspecialchars(trim($input["name"] ?? $input["fullName"] ?? ""));
    }
    $email        = filter_var($input["email"] ?? $input["workEmail"] ?? "", FILTER_SANITIZE_EMAIL);
    $phone        = htmlspecialchars(trim($input["phone"] ?? $input["phoneNumber"] ?? ""));
    $company      = htmlspecialchars(trim($input["company"] ?? $input["organization"] ?? ""));
    $topic        = htmlspecialchars(trim($input["topic"] ?? "General Inquiry"));
    $msg          = htmlspecialchars(trim($input["message"] ?? $input["comments"] ?? $input["notes"] ?? ""));

    if (!$name || !$email) {
        http_response_code(400);
        echo json_encode([
            "success" => false,
            "message" => "Name and Email are required."
        ]);
        exit();
    }

    $subject = "New Contact Inquiry: $name ($topic)";

    $message = "Contact Inquiry\n\n";
    $message .= "Name: $name\n";
    $message .= "Email: $email\n";
    if (!empty($phone)) $message .= "Phone: $phone\n";
    if (!empty($company)) $message .= "Company / Organization: $company\n";
    $message .= "Topic: $topic\n";
    if (!empty($msg)) $message .= "Message: $msg\n";

/*
|--------------------------------------------------------------------------
| Demo Form
|--------------------------------------------------------------------------
*/
} else {

    $name            = htmlspecialchars(trim($input["name"] ?? $input["fullName"] ?? ""));
    $email           = filter_var($input["email"] ?? $input["workEmail"] ?? "", FILTER_SANITIZE_EMAIL);
    $phone           = htmlspecialchars(trim($input["phone"] ?? $input["phoneNumber"] ?? ""));
    $organization    = htmlspecialchars(trim($input["organization"] ?? $input["company"] ?? ""));
    $role            = htmlspecialchars(trim($input["role"] ?? $input["jobTitle"] ?? ""));
    $environment     = htmlspecialchars(trim($input["environment"] ?? $input["dataEnvironment"] ?? ""));
    $teamSize        = htmlspecialchars(trim($input["teamSize"] ?? $input["companySize"] ?? ""));
    $prefDate        = htmlspecialchars(trim($input["prefDate"] ?? $input["preferredDate"] ?? ""));
    $prefTime        = htmlspecialchars(trim($input["prefTime"] ?? $input["preferredTime"] ?? ""));
    $msg             = htmlspecialchars(trim($input["message"] ?? $input["notes"] ?? $input["comments"] ?? ""));

    if (!$name || !$email) {
        http_response_code(400);
        echo json_encode([
            "success" => false,
            "message" => "Name and Email are required."
        ]);
        exit();
    }

    $subject = "New Demo Request: $name" . (!empty($organization) ? " ($organization)" : "");

    $message = "Enterprise Demo Request\n\n";
    $message .= "Full Name: $name\n";
    $message .= "Work Email: $email\n";
    if (!empty($phone)) $message .= "Phone: $phone\n";
    if (!empty($organization)) $message .= "Organization: $organization\n";
    if (!empty($role)) $message .= "Role / Title: $role\n";
    if (!empty($environment)) $message .= "Data Environment: $environment\n";
    if (!empty($teamSize)) $message .= "Team / Company Size: $teamSize\n";
    if (!empty($prefDate)) $message .= "Preferred Date: $prefDate\n";
    if (!empty($prefTime)) $message .= "Preferred Time: $prefTime\n";
    if (!empty($msg)) $message .= "Additional Notes: $msg\n";
}

/*
|--------------------------------------------------------------------------
| Mail Headers
|--------------------------------------------------------------------------
*/

$htmlBody = "<div style='font-family: Arial, sans-serif; font-size: 14px; line-height: 1.6; color: #333;'>" . nl2br(htmlspecialchars($message)) . "</div>";
$res = sendSmtpEmail($to, $subject, $htmlBody, $email ?? '', $name ?? ($contactPerson ?? ''));
$result = $res['success'] ?? false;

if ($result) {

    echo json_encode([
        "success" => true,
        "message" => "Email sent successfully."
    ]);

} else {

    http_response_code(500);

    echo json_encode([
        "success" => false,
        "message" => "Failed to send email."
    ]);
}
?>