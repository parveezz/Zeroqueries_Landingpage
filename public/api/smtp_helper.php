<?php

/**
 * ZeroQueries - Hostinger SMTP Helper
 * Uses PHPMailer + authenticated Hostinger SMTP.
 *
 * IMPORTANT:
 * Do NOT put the SMTP password directly in this file.
 * Configure HOSTINGER_SMTP_PASSWORD on the server.
 */

declare(strict_types=1);

use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\PHPMailer;

// ---------------------------------------------------------
// Load PHPMailer (supports both /PHPMailer/src and /phpmailer/src on Linux)
// ---------------------------------------------------------
$phpMailerDir = __DIR__ . '/PHPMailer/src';
if (!is_dir($phpMailerDir)) {
    $phpMailerDir = __DIR__ . '/phpmailer/src';
}
require_once $phpMailerDir . '/Exception.php';
require_once $phpMailerDir . '/PHPMailer.php';
require_once $phpMailerDir . '/SMTP.php';


// ---------------------------------------------------------
// Send email through Hostinger SMTP
// ---------------------------------------------------------
function sendSmtpEmail(
    string $toEmail,
    string $subject,
    string $htmlContent,
    string $replyToEmail = '',
    string $replyToName = ''
): array {

    // -----------------------------------------------------
    // Validate recipient
    // -----------------------------------------------------
    if (!filter_var($toEmail, FILTER_VALIDATE_EMAIL)) {
        return [
            'success' => false,
            'method'  => 'smtp',
            'error'   => 'Invalid recipient email address.'
        ];
    }

    // -----------------------------------------------------
    // Hostinger SMTP configuration
    // -----------------------------------------------------
    $smtpHost = 'smtp.hostinger.com';
    $smtpPort = 465;
    $smtpUser = 'info@invertiosolutions.com';

    $smtpPass = 'Invertio@2026$';

    $fromEmail = 'info@invertiosolutions.com';
    $fromName  = 'ZeroQueries';

    $mail = new PHPMailer(true);

    try {

        // -------------------------------------------------
        // SMTP mode
        // -------------------------------------------------
        $mail->isSMTP();

        $mail->Host       = $smtpHost;
        $mail->SMTPAuth   = true;
        $mail->Username   = $smtpUser;
        $mail->Password   = $smtpPass;

        // Hostinger port 465 = implicit SSL
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
        $mail->Port       = $smtpPort;

        // -------------------------------------------------
        // Character encoding
        // -------------------------------------------------
        $mail->CharSet = 'UTF-8';

        // -------------------------------------------------
        // Sender
        // -------------------------------------------------
        $mail->setFrom($fromEmail, $fromName);

        // -------------------------------------------------
        // Recipient
        // -------------------------------------------------
        $mail->addAddress($toEmail);

        // -------------------------------------------------
        // Reply-To
        // -------------------------------------------------
        if (
            $replyToEmail !== '' &&
            filter_var($replyToEmail, FILTER_VALIDATE_EMAIL)
        ) {
            $mail->addReplyTo(
                $replyToEmail,
                $replyToName !== '' ? $replyToName : $replyToEmail
            );
        }

        // -------------------------------------------------
        // Email content
        // -------------------------------------------------
        $mail->isHTML(true);

        $mail->Subject = $subject;
        $mail->Body    = $htmlContent;

        // Plain-text fallback
        $mail->AltBody = trim(
            html_entity_decode(
                strip_tags($htmlContent),
                ENT_QUOTES,
                'UTF-8'
            )
        );

        // -------------------------------------------------
        // Send
        // -------------------------------------------------
        $mail->send();

        return [
            'success' => true,
            'method'  => 'smtp'
        ];

    } catch (Exception $e) {

        // Log the actual PHPMailer error server-side.
        // Never log the SMTP password.
        error_log(
            '[ZeroQueries SMTP] PHPMailer error: ' . $mail->ErrorInfo
        );

        return [
            'success' => false,
            'method'  => 'smtp',
            'error'   => $mail->ErrorInfo
        ];
    }
}
