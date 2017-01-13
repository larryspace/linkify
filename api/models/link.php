<?php
namespace app\models;

use app\Model;
/**
 *
 */
class Link extends VoteModel
{
    static $table = "links";


    function __construct()
    {
        $this->directory = strtolower($this->directory);
        $this->upvoted = $this->upvoted ? true : false;
        $this->downvoted = $this->downvoted ? true : false;
        $this->author = \app\stores\User::fetch($this->user_id, [
            'username',
            'avatar'
        ]);
    }

    function updateDescription($description){
        $this->description = $description;
        return $this->_save([
            'description' => $description
        ]);
    }

    function increaseCommentCount(){
        if($this->comment_count){
            $this->comment_count++;
        }

        $sql = "
            UPDATE `links`
            SET comment_count = comment_count + 1
            WHERE id = :id
        ";

        try {
            \Database::query($sql, [
                'id' => $this->id
            ]);
        } catch (Exception $e) {
            throw new \ApiException('Could not increase comment count', 400);
        }
    }
}
