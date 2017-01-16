<?php
namespace app\stores;

/**
 *
 */
class Subscriptions
{
    public static $model = "\app\models\Subscription";

    public static function get($directoryId, $userId)
    {
        return \Database::fetch('subscriptions', [
            'directory_id',
            'user_id'
        ], [
            'directory_id' => $directoryId,
            'user_id' => $userId
        ], self::$model);
    }

    public static function create($directoryId, $userId)
    {
        return \Database::create('subscriptions', [
            'directory_id' => $directoryId,
            'user_id' => $userId
        ]);
    }
}
