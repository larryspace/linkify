<?php
namespace app\controllers;

/**
 *
 */
class Directory
{

    static function getDefaultDirectories($params){
        $defaultDirectories = \app\stores\Directory::getDefault();
        return $defaultDirectories;
    }
}
