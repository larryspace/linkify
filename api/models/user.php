<?php
namespace app\models;

use app\Model;

/**
 *
 */
class User extends Model
{
    public static $table = "users";

    public static function get($id)
    {
        return parent::_get($id, ['id',
                                'username',
                                'email',
                                'first_name',
                                'last_name']);
    }
}
