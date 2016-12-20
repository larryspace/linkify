<?php
namespace app\controllers;

/**
 *
 */
class User
{

    static function getUserInfo($params, $userInfo){
        return [
            'userInfo' => $userInfo
        ];
    }

    static function Register(){
        $postBody = get_json_body(true);

        $errors = \FormValidator::validate($postBody,
          [
              'email' => 'required|email',
              'password' => 'required|password',
              'username' => 'required|string'
          ]);

        if($errors){
            throw new \ApiException('FormError', 400, $errors);
        }

        $username = $postBody['username'];
        $password = $postBody['password'];
        $email = $postBody['email'];

        try {
            \app\stores\User::add($username, $password, $email);
        } catch (Exception $e) {
            throw new \ApiException('Couldn\'t add user for some reason', 400);
        }

        return;
    }

    static function Login(){
        $postBody = get_json_body(true);

        $errors = \FormValidator::validate($postBody,
          [
              'username' => 'required|string',
              'password' => 'required|password'
          ]);

        if($errors){
            throw new \ApiException('FormError', 400, $errors);
        }

        $username = $postBody['username'];
        $password = $postBody['password'];

        try {
            $token = \Authentication::login($username, $password);
            if(!$token){
                throw new \ApiException('Couldn\'t login for some reason', 400);
            }

            return [
                'userInfo' => \app\stores\User::getFullUserInfo($token->user_id),
                'token' => $token->toString()
            ];

        } catch (Exception $e) {
            throw new \ApiException('Couldn\'t login for some reason', 400);
        }


    }
}
