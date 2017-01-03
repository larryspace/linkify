<?php
namespace app\stores;


/**
 *
 */
class Links
{
    static function add($directoryId, $userId, $title, $url, $image = NULL){
        return \Database::create('links', [
            'directory_id' => $directoryId,
            'user_id' => $userId,
            'title' => $title,
            'url' => $url,
            'image' => $image]);
    }

    static function get($id){
        return \Database::fetch('links', [
            'title',
            'url',
            'image',
            'directory_id',
            'user_id',
            'created_at'
        ], ['id' => $id], '\app\models\Link');
    }

    static function getLinksByDirectory($directoryId){
        return \Database::fetchAll('links', [
            'title',
            'url',
            'image',
            'directory_id',
            'user_id',
            'created_at'
        ], ['directory_id' => $directoryId], '\app\models\Link');
    }

    static function getLinksAllLinks(){
        return \Database::fetchAll('links', [
            'title',
            'url',
            'image',
            'directory_id',
            'user_id',
            'created_at'
        ], NULL, '\app\models\Link');
    }
}
