<?php
// partials/head.php
// Usage: include with $pageTitle and $pageCSS (optional extra CSS file name)
if (!isset($pageTitle)) $pageTitle = 'KOMPUTERKU';
if (!isset($pageCSS))   $pageCSS = '';

// Determine base path for assets.
// All PHP pages live at the project root (no subdirectory pages),
// so baseAssets is always '' for root pages and '../' for one level deep.
// SCRIPT_NAME example: /KOMPUTERKU/index.php  → depth=2  → segments-1=1  → ''
// SCRIPT_NAME example: /KOMPUTERKU/fmc-keyboard.php → same level → ''
// All .php pages are in the project root, so $baseAssets = '' always.
$baseAssets = '';
?>
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="KOMPUTERKU – Belajar tentang komputer dengan cara yang menyenangkan!">
  <title><?= htmlspecialchars($pageTitle) ?> – KOMPUTERKU</title>

  <!-- Base styles -->
  <link rel="stylesheet" href="<?= $baseAssets ?>assets/css/base.css">
  <link rel="stylesheet" href="<?= $baseAssets ?>assets/css/components.css">
  <link rel="stylesheet" href="<?= $baseAssets ?>assets/css/extras.css">
  <?php if ($pageCSS): ?>
  <link rel="stylesheet" href="<?= $baseAssets ?>assets/css/<?= htmlspecialchars($pageCSS) ?>">
  <?php endif; ?>

  <style>
    /* Inline critical: prevent FOUC */
    body { visibility: visible; }
  </style>
</head>
<body>
