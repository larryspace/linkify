<?php
namespace app\stores;

/**
 *
 */
class Subscriptions
{

    static $model = "\app\models\Subscription";

    static function get($directoryId, $userId){
        return \Database::fetch('subscriptions', [
            'directory_id',
            'user_id'
        ], [
            'directory_id' => $directoryId,
            'user_id' => $userId
        ], self::$model);
    }

    static function create($directoryId, $userId){
        return \Database::create('subscriptions', [
            'directory_id' => $directoryId,
            'user_id' => $userId
        ]);
    }
}
