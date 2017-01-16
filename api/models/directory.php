<?php
namespace app\models;

use app\Model;

/**
 *
 */
class Directory extends Model
{
    public static $table = "directories";

    public function __construct()
    {
        $this->subscribed = false;
    }
}
