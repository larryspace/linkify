<?php
namespace app\models;

use app\Model;
/**
 *
 */
class Comment extends  Model
{
    static $table = "comments";

    function updateContent($content){
        $this->content = $content;
        return $this->_save([
            'content' => $content
        ]);
    }
}
