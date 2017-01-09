<?php
namespace app\controllers;

/**
 *
 */
class Comments
{

    static $num = 1;

    static function genFakeComments($parent = 0){
        return [
            'id' => self::$num++,
            'parent' => $parent,
            'author' => 'Thehink',
            'content' => 'My Comment',
            'created_at' => '',
            'updated_at' => ''
        ];
    }

    static function getLinkComments($params){
        $id = (int)$params['link'];

        return [self::genFakeComments(),self::genFakeComments(1),self::genFakeComments(1),self::genFakeComments(),self::genFakeComments(2),self::genFakeComments(3)];
    }
}
