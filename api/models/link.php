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

        if($this->deleted){
            $this->deleted = true;
        }else{
            unset($this->deleted);
        }
    }

    function updateDescription($description){
        $this->description = $description;
        return $this->_save([
            'description' => $description
        ]);
    }

    function delete(){
        $this->description = '';
        $this->deleted = true;
        $this->author = null;

        return $this->_save([
            'description' => '',
            'title' => '',
            'url' => '',
            'user_id' => null,
            'deleted' => true
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
