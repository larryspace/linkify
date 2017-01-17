<?php
namespace app\controllers;

/**
 *
 */
class Directory
{
    /**
     * Get a list of default directories
     * @param  Array $params Array of params
     * @return [app\models\Directory]         Array of Directories
     */
    public static function getDefault($params)
    {
        $directories = \app\stores\Directory::getDefault();
        return $directories;
    }

    /**
     * Get a list of subscribed directories
     * @param  Array $params Array of params
     * @param  app\models\User $user   Authenticated user
     * @return [app\models\Directory]         Array of Directories
     */
    public static function getSubscribed($params, $user)
    {
        $directories = \app\stores\Directory::getSubscribed($user->id);
        return $directories;
    }

    /**
     * Get a single directory by name
     * @param  Array $params Array of params
     * @return app\models\Directory         Directory
     */
    public static function getDirectory($params)
    {
        $directory = \app\stores\Directory::getDirectory($params['directory']);

        if (!$directory) {
            throw new \ApiException('NotFound', 404, ['_error' => 'Directory "' . $params['directory'] . '" doesn\'t exist']);
        }

        return $directory;
    }

    /**
     * Subscribe to a directory
     * @param  Array $params Array of params
     * @param  app\models\User $user   Authenticated user
     * @return app\models\Directory    Directory
     */
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

    /**
     * Unsubscribe to a directory
     * @param  Array $params Array of params
     * @param  app\models\User $user   Authenticated user
     * @return app\models\Directory    Directory
     */
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
