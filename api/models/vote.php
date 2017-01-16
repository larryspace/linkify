<?php
namespace app\models;

use app\Model;

/**
 *
 */
class Vote extends Model
{
    public static $table = "votes";


    public function updateVote($vote)
    {
        $this->vote = $vote;
        return $this->_save([
            'vote' => $vote
        ]);
    }
}
