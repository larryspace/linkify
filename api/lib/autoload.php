<?php
require_once __DIR__ . '/../../vendor/autoload.php';

$dotenv = new Dotenv\Dotenv(__DIR__ . '/../');
$dotenv->overload();
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
require_once __DIR__ . '/voteModel.php';
require_once __DIR__ . '/database.php';
require_once __DIR__ . '/authentication.php';

require_once __DIR__ . '/../controllers/user.php';
require_once __DIR__ . '/../controllers/userSettings.php';
require_once __DIR__ . '/../controllers/directory.php';
require_once __DIR__ . '/../controllers/links.php';
require_once __DIR__ . '/../controllers/comments.php';

require_once __DIR__ . '/../models/token.php';
require_once __DIR__ . '/../models/user.php';
require_once __DIR__ . '/../models/directory.php';
require_once __DIR__ . '/../models/link.php';
require_once __DIR__ . '/../models/vote.php';
require_once __DIR__ . '/../models/comment.php';
require_once __DIR__ . '/../models/subscription.php';

require_once __DIR__ . '/../stores/user.php';
require_once __DIR__ . '/../stores/directory.php';
require_once __DIR__ . '/../stores/links.php';
require_once __DIR__ . '/../stores/votes.php';
require_once __DIR__ . '/../stores/comments.php';
require_once __DIR__ . '/../stores/subscriptions.php';

//should move this later
if (!function_exists('getallheaders'))  {
    function getallheaders()
    {
        if (!is_array($_SERVER)) {
            return array();
        }

        $headers = array();
        foreach ($_SERVER as $name => $value) {
            if (substr($name, 0, 5) == 'HTTP_') {
                $headers[str_replace(' ', '-', ucwords(strtolower(str_replace('_', ' ', substr($name, 5)))))] = $value;
            }
        }
        return $headers;
    }
}
