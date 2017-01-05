<?php

/**
 *
 */
class Authentication
{
    static $isLoggedIn = false;
    static $user = null;

    static function getToken(){
        $headers = getallheaders();

        if(!isset($headers['authorization'])){
            throw new ApiException("Unauthorized", 401);
        }

        $matches = array();
        preg_match('/Token (.*)/', $headers['authorization'], $matches);
        if(isset($matches[1])){
            $token = $matches[1];
        }

        $token = \app\models\Token::get($token);
        return $token;
    }

    static function checkLogin(){
        $token = self::getToken();

        if(!$token){
            throw new ApiException("Unauthorized", 401);
        }

        if($token->type !== 'auth'){
            throw new ApiException("Invalid Token Type", 401);
        }

        $user = \app\stores\User::getFullUserInfo($token->user_id);
        self::$isLoggedIn = true;
        return $user;
    }

    static function getUser(){
        if(self::$user){
            return $user;
        }else if(self::$user === false){
            return;
        }

        try {
            self::$user = self::checkLogin();
            return self::$user;
        } catch (\ApiException $e) {
            self::$user = false;
            return;
        }
    }

    static function requireAuth(){
        return self::checkLogin();
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
