<?php
namespace app\controllers;

/**
 *
 */
class User
{
    public static function getUserAuthInfo($params, $user)
    {
        return [
            'id' => $user->id,
            'user' => $user
        ];
    }

    public static function getUserInfo($params)
    {
        $id = (int)$params['id'];

        $user = \app\stores\User::fetch($id, [
            'username',
            'avatar'
        ]);

        if (!$user) {
            throw new \ApiException('User does not exist', 400);
        }

        return [
            'id' => $user->id,
            'username' => $user->username,
            'avatar' => $user->avatar
        ];
    }
    public static function logout($params, $user)
    {
        $token = \Authentication::getToken();
        $token->_delete();
    }

    public static function register()
    {
        $postBody = get_json_body(true);

        $errors = \FormValidator::validate($postBody,
          [
              'email' => 'required|email|unique:users.email',
              'password' => 'required|password',
              'username' => 'required|string|unique:users.username'
          ]);

        if ($errors) {
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

    public static function login()
    {
        $postBody = get_json_body(true);

        $errors = \FormValidator::validate($postBody,
          [
              'username' => 'required|string',
              'password' => 'required|password'
          ]);

        if ($errors) {
            throw new \ApiException('FormError', 400, $errors);
        }

        $username = $postBody['username'];
        $password = $postBody['password'];

        try {
            $token = \Authentication::login($username, $password);
            if (!$token) {
                throw new \ApiException('Couldn\'t login for some reason', 400);
            }

            $user = \app\stores\User::getFullUserInfo($token->user_id);

            return [
                'id' => $token->user_id,
                'user' => $user,
                'token' => $token->toString()
            ];
        } catch (\ApiException $e) {
            throw new \ApiException('FormError', 400, ['_error' => 'Wrong username or password']);
        } catch (Exception $e) {
            throw new \ApiException('Couldn\'t login for some reason', 400);
        }
    }
}
