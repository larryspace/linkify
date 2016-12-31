<?php
namespace app;

/**
 *
 */
class Model
{

  static $table = "";

  function __construct()
  {
  }

  function _save($values){
    return \Database::save(get_class($this)::$table, $values, ['id' => $this->id]);
  }

  function _delete(){
    return \Database::delete(get_class($this)::$table, ['id' => $this->id]);
  }

  static function _get($id, $values){
      return \Database::get(get_class($this)::$table, $values, ['id' => $id], self::$table);
  }

}
