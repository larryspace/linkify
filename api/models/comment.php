<?php
namespace app\models;

use app\Model;

/**
 *
 */
class Comment extends VoteModel
{
    public static $table = "comments";

    public function __construct()
    {
        $this->author = \app\stores\User::getPublicUserInfo($this->user_id);

        $this->upvoted = $this->upvoted ? true : false;
        $this->downvoted = $this->downvoted ? true : false;
        $this->deleted = $this->deleted ? true : false;
    }

    public function delete()
    {
        $this->deleted = true;
        $this->content = '';
        $this->author = null;

        return $this->_save([
            'user_id' => null,
            'content' => '',
            'deleted' => true
        ]);
    }

    public function updateContent($content)
    {
        $this->content = $content;
        return $this->_save([
            'content' => $content
        ]);
    }

    public function get()
    {
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
