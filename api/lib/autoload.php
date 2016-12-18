<?php
require_once __DIR__ . '/../../vendor/autoload.php';

$dotenv = new Dotenv\Dotenv(__DIR__ . '/../');
$dotenv->load();

require_once __DIR__ . '/helpers.php';
require_once __DIR__ . '/formValidator.php';
require_once __DIR__ . '/miniRoute.php';
require_once __DIR__ . '/model.php';
require_once __DIR__ . '/database.php';
