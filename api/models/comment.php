<?php
namespace app\models;

use app\Model;
/**
 *
 */
class Comment extends VoteModel
{
    static $table = "comments";

    function __construct()
    {
        $this->author = \app\stores\User::fetch($this->user_id, [
            'id',
            'username',
            'avatar'
        ]);

        $this->upvoted = $this->upvoted ? true : false;
        $this->downvoted = $this->downvoted ? true : false;
    }

    function updateContent($content){
        $this->content = $content;
        return $this->_save([
            'content' => $content
        ]);
    }

    function get(){
        return [
            'id' => $this->id,
            'content' => $this->content,
            'link_id' => $this->link_id,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            'parent_id' => $this->parent_id,
            'author' => $this->author,
            'votes' => $this->votes,
            'upvoted' => $this->upvoted,
            'downvoted' => $this->downvoted
        ];
    }
}
