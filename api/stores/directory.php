<?php
namespace app\stores;

/**
 *
 */
class Directory
{
    public static $model = "\app\models\Directory";

    public static function getDefault()
    {
        return \Database::fetchAll('directories', [
            'name',
            'description',
            'default',
            'banner',
            'creator',
            'created_at'
        ], ['default' => true], self::$model);
    }

    public static function getSubscribed($userId)
    {
        $sql = "
            SELECT
                directories.id,
                directories.name,
                directories.description,
                directories.default,
                directories.banner
            FROM directories
            INNER JOIN subscriptions ON
                subscriptions.directory_id = directories.id AND
                subscriptions.user_id = :user_id
        ";

        $values = [
            'user_id' => $userId
        ];

        $directories = \Database::queryFetchAll($sql, $values, self::$model);
        return $directories;
    }

    public static function getDirectory($name)
    {
        return \Database::fetch('directories', [
            'name',
            'description',
            'default',
            'banner',
            'creator',
            'created_at'
        ], ['name' => $name], self::$model);
    }
}
