<?php
require_once '../includes/auth.php';
require_once '../includes/config.php';

$success = '';

// Handle content update
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $lines = file('../includes/config.php', FILE_IGNORE_NEW_LINES);
    $new_title       = htmlspecialchars($_POST['title'] ?? $site['title']);
    $new_tagline     = htmlspecialchars($_POST['tagline'] ?? $site['tagline']);
    $new_description = htmlspecialchars($_POST['description'] ?? $site['description']);
    $new_cta         = htmlspecialchars($_POST['cta_text'] ?? $site['cta_text']);
    $new_email       = htmlspecialchars($_POST['contact_email'] ?? $site['contact_email']);
    $new_footer      = htmlspecialchars($_POST['footer_text'] ?? $site['footer_text']);

    $config = file_get_contents('../includes/config.php');

    $config = preg_replace("/'title'\s*=>\s*'[^']*'/",       "'title'       => '$new_title'",       $config);
    $config = preg_replace("/'tagline'\s*=>\s*'[^']*'/",     "'tagline'     => '$new_tagline'",     $config);
    $config = preg_replace("/'description'\s*=>\s*'[^']*'/", "'description' => '$new_description'", $config);
    $config = preg_replace("/'cta_text'\s*=>\s*'[^']*'/",    "'cta_text'    => '$new_cta'",         $config);
    $config = preg_replace("/'contact_email'\s*=>\s*'[^']*'/"," 'contact_email' => '$new_email'",   $config);
    $config = preg_replace("/'footer_text'\s*=>\s*'[^']*'/", "'footer_text'   => '$new_footer'",    $config);

    file_put_contents('../includes/config.php', $config);
    $success = 'Content updated successfully.';

    // Reload updated config
    require '../includes/config.php';
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Dashboard</title>
    <link rel="stylesheet" href="../assets/admin.css">
</head>
<body>

<div class="admin-layout">
    <!-- Sidebar -->
    <aside class="sidebar">
        <span class="brand">⚙ Admin</span>
        <a href="dashboard.php" class="active">Dashboard</a>
        <a href="../index.php" target="_blank">View Site</a>
        <a href="logout.php">Logout</a>
    </aside>

    <!-- Main -->
    <main class="main-content">
        <h1 class="page-title">Dashboard</h1>

        <!-- Stats -->
        <div class="cards">
            <div class="card">
                <div class="label">Features</div>
                <div class="value"><?= count($site['features']) ?></div>
            </div>
            <div class="card">
                <div class="label">Site Title</div>
                <div class="value" style="font-size:1.1rem;padding-top:.4rem"><?= htmlspecialchars($site['title']) ?></div>
            </div>
        </div>

        <!-- Edit Content -->
        <div class="edit-section">
            <h2>Edit Site Content</h2>
            <?php if ($success): ?>
                <p class="success"><?= $success ?></p>
            <?php endif; ?>
            <form method="POST">
                <div class="form-group">
                    <label>Site Title</label>
                    <input type="text" name="title" value="<?= htmlspecialchars($site['title']) ?>">
                </div>
                <div class="form-group">
                    <label>Tagline</label>
                    <input type="text" name="tagline" value="<?= htmlspecialchars($site['tagline']) ?>">
                </div>
                <div class="form-group">
                    <label>Description</label>
                    <textarea name="description"><?= htmlspecialchars($site['description']) ?></textarea>
                </div>
                <div class="form-group">
                    <label>CTA Button Text</label>
                    <input type="text" name="cta_text" value="<?= htmlspecialchars($site['cta_text']) ?>">
                </div>
                <div class="form-group">
                    <label>Contact Email</label>
                    <input type="email" name="contact_email" value="<?= htmlspecialchars($site['contact_email']) ?>">
                </div>
                <div class="form-group">
                    <label>Footer Text</label>
                    <input type="text" name="footer_text" value="<?= htmlspecialchars($site['footer_text']) ?>">
                </div>
                <button type="submit" class="save-btn">Save Changes</button>
            </form>
        </div>
    </main>
</div>

</body>
</html>
