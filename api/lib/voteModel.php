<?php
namespace app\models;

use app\Model;

/**
 *
 */
class VoteModel extends Model
{
    public function addVote($vote)
    {
        if ($vote === 1) {
            $this->upvoted = true;
            $this->votes++;
            $type = 'upvotes';
        } else {
            $this->downvoted = true;
            $this->votes--;
            $type = 'downvotes';
        }

        $sql = "
            UPDATE `" . get_class($this)::$table . "`
            SET $type = $type + 1
            WHERE id = :id
        ";

        try {
            \Database::query($sql, [
                'id' => $this->id
            ]);
        } catch (Exception $e) {
            throw new \ApiException('Could not vote', 400);
        }
    }

    public function removeVote($voteOption)
    {
        if ($voteOption === 1) {
            $this->upvoted = false;
            $this->votes--;
            $type = 'upvotes';
        } else {
            $this->downvoted = false;
            $this->votes++;
            $type = 'downvotes';
        }

        $sql = "
            UPDATE `" . get_class($this)::$table . "`
            SET $type = $type - 1
            WHERE id = :id
        ";

        try {
            \Database::query($sql, [
                'id' => $this->id
            ]);
        } catch (Exception $e) {
            throw new \ApiException('Could not vote', 400);
        }
    }

    public function changeVote($newVote)
    {
        if ($newVote === 1) {
            $this->upvoted = true;
            $this->downvoted = false;
            $this->votes += 2;
            $addVote = 'upvotes';
            $reduceVote = 'downvotes';
        } else {
            $this->upvoted = false;
            $this->downvoted = true;
            $this->votes -= 2;
            $addVote = 'downvotes';
            $reduceVote = 'upvotes';
        }

        $sql = "
            UPDATE `" . get_class($this)::$table . "`
            SET
                $addVote = $addVote + 1,
                $reduceVote = $reduceVote - 1
            WHERE id = :id
        ";

        try {
            \Database::query($sql, [
                'id' => $this->id
            ]);
        } catch (Exception $e) {
            throw new \ApiException('Could not vote', 400);
        }
    }
}
