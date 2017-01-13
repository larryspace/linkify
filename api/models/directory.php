<?php
namespace app\models;

use app\Model;
/**
 *
 */
class Directory extends Model
{
    static $table = "directories";

    function __construct()
    {
        $this->subscribed = false;
    }
}
