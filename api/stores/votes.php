<?php
namespace app\stores;


/**
 *
 */
class Votes
{
    const LINK = 0;
    const COMMENT = 1;

    static function get($type, $id, $userId){
        return \Database::fetch('votes', [
            'type',
            'vote',
            'content_id',
            'user_id'
        ], [
            'type' => $type,
            'content_id' => $id,
            'user_id' => $userId,
        ], '\app\models\Vote');
    }

    static function create($type, $id, $userId, $vote){
        return \Database::create('votes', [
            'type' => $type,
            'vote' => $vote,
            'content_id' => $id,
            'user_id' => $userId
        ]);
    }
}
