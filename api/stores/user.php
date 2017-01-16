<?php
namespace app\stores;

/**
 *
 */
class User
{
    public static function add($username, $password, $email)
    {
        $password = password_hash($password, PASSWORD_BCRYPT);

        return \Database::create('users', [
            'username' => $username,
            'password' => $password,
            'email' => $email]);
    }

    public static function fetch($id, $values)
    {
        return \Database::fetch('users', $values, ['id' => $id], '\app\models\User');
    }

    public static function fetchByName($username, $values = [])
    {
        return \Database::fetch('users', $values, ['username' => $username], '\app\models\User');
    }

    public static function fetchByEmail($email, $values = [])
    {
        return \Database::fetch('users', $values, ['email' => $email], '\app\models\User');
    }

    public static function getFullUserInfo($userId)
    {
        return \Database::fetch('users', [
            'id',
            'username',
            'email',
            'first_name',
            'last_name',
            'avatar'
        ], ['id' => $userId], '\app\models\User');
    }

    public static function get($id)
    {
    }
}
