<?php

/**
 *
 */
class Authentication
{
    static $isLoggedIn = false;

    static function checkLogin(){
        $headers = getallheaders();

        if(!isset($headers['token'])){
            throw new Exception("Unauthorized", 401);
        }

        $matches = array();
        preg_match('/Token (.*)/', $headers['authorization'], $matches);
        if(isset($matches[1])){
            $token = $matches[1];
        }

        $token = Token::get($headers['token']);

        if(!$token){
            throw new Exception("Unauthorized", 401);
        }

        if($token->type !== 'login'){
            throw new Exception("Unauthorized", 401);
        }

        $user = UserStore::get($token->user_id);
        self::$isLoggedIn = true;
        return $user;
    }

    static function requireLogin($data){

    }

    static function login($username, $password){
        $user = \app\stores\User::fetchByName($username, ['password']);

        if(!$user){
            throw new \ApiException('Login error', 400);
        }

        if(!password_verify($password, $user->password)){
            throw new \ApiException('Login error', 400);
        }

        self::$isLoggedIn = true;

        $timestamp = time() + 60 * 60 * 24 * 30;
        $expire = date("Y-m-d H:i:s", $timestamp);

        $token = \app\models\Token::create($user->id, 'auth', $expire);

        return $token;
    }
}
