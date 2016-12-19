<?php
//use \PDO;

require_once  __DIR__ . '/../models/token.php';
require_once  __DIR__ . '/../models/user.php';

/**
 *
 */
class Database
{

  static $db = null;

  static function get(){
      if(self::$db){
          return self::$db;
      }

      self::$db = new PDO('mysql:host=' . $_ENV['DB_HOST'] . ';dbname=' . $_ENV['DB_NAME'] . ';charset=utf8', $_ENV['DB_USER'], $_ENV['DB_PASSWORD']);
      self::$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
      self::$db->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);
      return self::$db;
  }

  static function save($table, $values, $where){
    $sql = "UPDATE $table SET ";
    foreach ($values as $key => $value) {
      $sql .= "$key = :$key, ";
    }
    $sql = rtrim($sql, ", ");
    $sql .= "  WHERE ";
    foreach ($where as $key => $value) {
      $sql .= "$key = :$key AND ";
    }
    $sql = rtrim($sql, "AND ");

    $stmt = self::get()->prepare($sql);

    return $stmt->execute(array_merge($values, $where));
  }

  static function delete($table, $where){
    $sql = "DELETE FROM $table WHERE ";
    foreach ($where as $key => $value) {
      $sql .= "$key = :$key AND ";
    }
    $sql = rtrim($sql, "AND ");

    $stmt = self::get()->prepare($sql);

    return $stmt->execute($where);
  }

  static function fetch($table, $values, $where, $class){

    if(!in_array('id', $values)){
        array_push($values, 'id');
    }

    $sql = "SELECT ";
    foreach ($values as $key) {
      $sql .= "$key, ";
    }
    $sql = rtrim($sql, ", ");
    $sql .= " FROM $table  WHERE ";
    foreach ($where as $key => $value) {
      $sql .= "$key = :$key AND ";
    }
    $sql = rtrim($sql, "AND ");

    $stmt = self::get()->prepare($sql);

    $stmt->setFetchMode(PDO::FETCH_CLASS, $class);
    $stmt->execute($where);

    return $stmt->fetch();
  }

  static function create($table, $values){
    $sql = "INSERT INTO $table (";

    foreach ($values as $key => $value) {
      $sql .= "$key, ";
    }

    $sql = rtrim($sql, ", ");

    $sql .= ") VALUES (";
    foreach ($values as $key => $value) {
      $sql .= ":$key, ";
    }
    $sql = rtrim($sql, ", ");
    $sql .= ")";

    $stmt = self::get()->prepare($sql);

    $stmt->execute($values);
    return self::get()->lastInsertId();
  }
}
