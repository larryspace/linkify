<?php
require_once __DIR__ . '/lib/autoload.php';
require_once __DIR__ . '/controllers/authentication.php';

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

$router->POST("/user", 'UserStore::updateUser', 'Authentication::requireAuth');
$router->GET("/user(/:id)", 'UserStore::getUser');

$router->POST("/register", 'Authentication::register');
$router->POST("/login", 'app\controllers\Authentication::login');
$router->GET("/logout", 'Authentication::logout', 'Authentication::requireAuth');
$router->GET("/user/auth", 'Authentication::auth');

$router->route();
