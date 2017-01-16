<?php
namespace app\models;

use app\Model;

/**
 *
 */
class Link extends VoteModel
{
    public static $table = "links";


    public function __construct()
    {
        $this->directory = strtolower($this->directory);
        $this->upvoted = $this->upvoted ? true : false;
        $this->downvoted = $this->downvoted ? true : false;
        $this->author = \app\stores\User::fetch($this->user_id, [
            'username',
            'avatar'
        ]);

        if ($this->deleted) {
            $this->deleted = true;
        } else {
            unset($this->deleted);
        }
    }

    public function updateDescription($description)
    {
        $this->description = $description;
        return $this->_save([
            'description' => $description
        ]);
    }

    public function delete()
    {
        $this->description = '';
        $this->deleted = true;
        $this->author = null;
        $this->title = '';
        $this->url = '';

        return $this->_save([
            'description' => '',
            'title' => '',
            'url' => '',
            'user_id' => null,
            'deleted' => true
        ]);
    }

    public function increaseCommentCount()
    {
        if ($this->comment_count) {
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
