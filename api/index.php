<?php
require_once __DIR__ . '/lib/autoload.php';
require_once __DIR__ . '/controllers/user.php';
require_once __DIR__ . '/controllers/userSettings.php';
require_once __DIR__ . '/controllers/directory.php';
require_once __DIR__ . '/controllers/links.php';
require_once __DIR__ . '/controllers/comments.php';

$router = new miniRoute();

//$router->GET("/", ['Test', 'asd']);


class TestClass
{
    public static function test($asd)
    {
        return $asd;
    }
}

$router->GET("/directories", 'app\controllers\Directory::getDefaultDirectories');
$router->GET("/d/:directory", 'app\controllers\Directory::getDirectory');

$router->GET("/d/link/:id", 'app\controllers\Links::getLink');
$router->GET("/d/:directory/:page/:sort", 'app\controllers\Links::getLinks');
$router->POST("/d/:directory/new", 'app\controllers\Links::newLink', '\Authentication::requireAuth');
$router->POST("/d/link/:id/:vote", 'app\controllers\Links::voteLink', '\Authentication::requireAuth');

$router->GET("/link/:link/comments", 'app\controllers\Comments::getLinkComments');

$router->POST("/account/info", 'app\controllers\UserSettings::updateInfo', '\Authentication::requireAuth');
$router->POST("/account/avatar", 'app\controllers\UserSettings::updateAvatar', '\Authentication::requireAuth');
$router->POST("/account/password", 'app\controllers\UserSettings::updatePassword', '\Authentication::requireAuth');

$router->POST("/register", 'app\controllers\User::register');
$router->POST("/login", 'app\controllers\User::login');
$router->GET("/logout", 'app\controllers\User::logout', '\Authentication::requireAuth');
$router->GET("/user/auth", 'app\controllers\User::getUserInfo', '\Authentication::requireAuth');

$router->POST("/user", 'UserStore::updateUser', 'Authentication::requireAuth');
$router->GET("/user(/:id)", 'UserStore::getUser');

$router->route();
