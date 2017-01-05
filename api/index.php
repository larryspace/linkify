<?php
require_once __DIR__ . '/lib/autoload.php';
require_once __DIR__ . '/controllers/user.php';
require_once __DIR__ . '/controllers/userSettings.php';
require_once __DIR__ . '/controllers/directory.php';
require_once __DIR__ . '/controllers/links.php';

$router = new miniRoute();

//$router->GET("/", ['Test', 'asd']);


class TestClass
{
    public static function test($asd)
    {
        return $asd;
    }
}


$router->GET("/test/:first/:second", 'TestClass::test');

$router->GET("/post/:id/comments", 'CommentStore::getComments');
$router->POST("/post/:id/comment", 'CommentStore::newComment', 'Authentication::requireAuth');
$router->POST("/post/:id/comment/:commentId/reply", 'CommentStore::newCommentReply', 'Authentication::requireAuth');
$router->POST("/post/:id/comment/:commentId/vote", 'CommentStore::voteComment', 'Authentication::requireAuth');
$router->DELETE("/post/:id/comment/:commentId", 'CommentStore::deleteComment', 'Authentication::requireAuth');

$router->POST("/post", 'PostStore::newPost', 'Authentication::requireAuth');
$router->POST("/post/:id/vote", 'PostStore::votePost', 'Authentication::requireAuth');
$router->POST("/post/:id", 'PostStore::updatePost', 'Authentication::requireAuth');
$router->DELETE("/post/:id", 'PostStore::deletePost', 'Authentication::requireAuth');
$router->GET("/posts(/:page)", 'PostStore::getPosts');

$router->GET("/directories", 'app\controllers\Directory::getDefaultDirectories');

$router->GET("/d/:directory/:page", 'app\controllers\Links::getLinks');
$router->POST("/d/:directory/new", 'app\controllers\Links::newLink', '\Authentication::requireAuth');

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
