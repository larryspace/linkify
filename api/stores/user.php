<?php
namespace app\stores;


/**
 *
 */
class User
{
    static function add($username, $password, $email){

        $password = password_hash($password, PASSWORD_BCRYPT);

        return \Database::create('users', [
            'username' => $username,
            'password' => $password,
            'email' => $email]);
    }

    static function fetchByName($username, $values){
        return \Database::fetch('users', $values, ['username' => $username], '\app\models\User');
    }

    static function get($id){

    }
}
