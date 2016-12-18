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

    static function get($id){

    }
}
