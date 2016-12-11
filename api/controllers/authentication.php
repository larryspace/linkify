<?php

namespace app\controllers;

/**
 *
 */
class Authentication
{
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
}
