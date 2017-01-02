<?php
require_once __DIR__ . '/../../vendor/autoload.php';

$dotenv = new Dotenv\Dotenv(__DIR__ . '/../');
$dotenv->load();
$dotenv->required([
    'DB_HOST',
    'DB_NAME',
    'DB_USER',
    'DB_PASSWORD',
    'TOKEN_ENCRYPTION_ALG',
    'TOKEN_ENCRYPTION_KEY',
    'TOKEN_ENCRYPTION_IV'
]);

require_once __DIR__ . '/apiException.php';
require_once __DIR__ . '/helpers.php';
require_once __DIR__ . '/formValidator.php';
require_once __DIR__ . '/miniRoute.php';
require_once __DIR__ . '/model.php';
require_once __DIR__ . '/database.php';
require_once __DIR__ . '/authentication.php';
