<?php
namespace app\models;

use app\Model;
/**
 *
 */
class Vote extends Model
{
    static $table = "votes";


    function updateVote($vote){
        $this->vote = $vote;
        return $this->_save([
            'vote' => $vote
        ]);
    }
}
