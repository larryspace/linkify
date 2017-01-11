<?php
namespace app\models;

use app\Model;
/**
 *
 */
class User extends  Model
{
    static $table = "users";

    static function get($id){
        return parent::_get($id, ['id',
                                'username',
                                'email',
                                'first_name',
                                'last_name']);
    }
}
