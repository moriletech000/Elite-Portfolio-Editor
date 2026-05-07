<?php
// Admin credentials (change these)
define('ADMIN_USER', 'admin');
define('ADMIN_PASS', password_hash('admin123', PASSWORD_DEFAULT));

// Site content
$site = [
    'title'       => 'My Landing Page',
    'tagline'     => 'We build amazing things.',
    'description' => 'A clean, fast, and modern landing page built with PHP.',
    'cta_text'    => 'Get Started',
    'cta_link'    => '#contact',
    'features'    => [
        ['icon' => '⚡', 'title' => 'Fast',    'desc' => 'Blazing fast performance out of the box.'],
        ['icon' => '🔒', 'title' => 'Secure',  'desc' => 'Built with security best practices.'],
        ['icon' => '🎨', 'title' => 'Beautiful','desc' => 'Clean and modern design.'],
    ],
    'contact_email' => 'hello@example.com',
    'footer_text'   => '© 2026 My Landing Page. All rights reserved.',
];
