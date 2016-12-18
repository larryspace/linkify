<?php
namespace app\controllers;

/**
 *
 */
class User
{
    static function Register(){
        $postBody = get_json_body(true);
        $username = $postBody['username'];
        $password = $postBody['password'];
        $email = $postBody['email'];

        $errors = \FormValidator::validate($postBody,
          [
              'email' => 'required|email',
              'password' => 'required|password',
              'username' => 'required|string']);

        if($errors){
            throw new Exception($errors, 400);
        }

        try {
            \app\stores\User::add($username, $password, $email);
        } catch (Exception $e) {
            throw new Exception('Couldn\'t add user for some reason', 400);
        }

        return;
    }
}
