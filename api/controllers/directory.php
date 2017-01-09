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

    static function getDirectory($params){
        $directory = \app\stores\Directory::getDirectory($params['directory']);
        return $directory;
    }
}
