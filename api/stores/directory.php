<?php
namespace app\stores;


/**
 *
 */
class Directory
{
    static function getDefault(){
        return \Database::fetchAll('directories', [
            'name',
            'description',
            'default',
            'banner',
            'creator',
            'created_at'
        ], ['default' => true], '\app\models\Directory');
    }
}
