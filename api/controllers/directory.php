<?php
namespace app\controllers;

/**
 *
 */
class Directory
{
    public static function getDefault($params)
    {
        $directories = \app\stores\Directory::getDefault();
        return $directories;
    }

    public static function getSubscribed($params, $user)
    {
        $directories = \app\stores\Directory::getSubscribed($user->id);
        return $directories;
    }

    public static function getDirectory($params)
    {
        $directory = \app\stores\Directory::getDirectory($params['directory']);

        if (!$directory) {
            throw new \ApiException('NotFound', 404, ['_error' => 'Directory "' . $params['directory'] . '" doesn\'t exist']);
        }

        return $directory;
    }

    public static function subscribe($params, $user)
    {
        $directory = $params['directory'];

        $directory = \app\stores\Directory::getDirectory($params['directory']);
        if (!$directory) {
            throw new \ApiException('NotFound', 404);
        }

        $subscription = \app\stores\Subscriptions::get($directory->id, $user->id);
        if ($subscription) {
            throw new \ApiException('You are already subscribed to this directory', 400);
        }

        $subscriptionId = \app\stores\Subscriptions::create($directory->id, $user->id);

        return ['name' => $directory->name];
    }

    public static function unsubscribe($params, $user)
    {
        $directory = $params['directory'];

        $directory = \app\stores\Directory::getDirectory($params['directory']);
        if (!$directory) {
            throw new \ApiException('NotFound', 404);
        }

        $subscription = \app\stores\Subscriptions::get($directory->id, $user->id);
        if (!$subscription) {
            throw new \ApiException('You can\'t unsubscribe to a directory you\'re not subscribed to', 400);
        }

        $subscription->_delete();

        return ['name' => $directory->name];
    }
}
