<?php require_once 'includes/config.php'; ?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?= htmlspecialchars($site['title']) ?></title>
    <link rel="stylesheet" href="assets/style.css">
</head>
<body>

<nav>
    <a class="logo" href="#"><?= htmlspecialchars($site['title']) ?></a>
    <div>
        <a href="#features">Features</a>
        <a href="#contact">Contact</a>
    </div>
</nav>

<!-- HERO -->
<section class="hero">
    <h1><?= htmlspecialchars($site['tagline']) ?></h1>
    <p><?= htmlspecialchars($site['description']) ?></p>
    <a class="btn" href="<?= htmlspecialchars($site['cta_link']) ?>"><?= htmlspecialchars($site['cta_text']) ?></a>
</section>

<!-- FEATURES -->
<section class="features" id="features">
    <?php foreach ($site['features'] as $f): ?>
    <div class="feature-card">
        <div class="icon"><?= $f['icon'] ?></div>
        <h3><?= htmlspecialchars($f['title']) ?></h3>
        <p><?= htmlspecialchars($f['desc']) ?></p>
    </div>
    <?php endforeach; ?>
</section>

<!-- CONTACT -->
<section class="contact" id="contact">
    <h2>Get in Touch</h2>
    <p>Have questions? Reach us at <a href="mailto:<?= htmlspecialchars($site['contact_email']) ?>"><?= htmlspecialchars($site['contact_email']) ?></a></p>
</section>

<footer>
    <p><?= htmlspecialchars($site['footer_text']) ?></p>
</footer>

</body>
</html>
