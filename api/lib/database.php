<?php
namespace app;

use \PDO;

require_once  __DIR__ . '/../models/token.php';
require_once  __DIR__ . '/../models/user.php';

$db = new PDO('mysql:host=' . $_ENV['DB_HOST'] . ';dbname=' . $_ENV['DB_NAME'] . ';charset=utf8', $_ENV['DB_USER'], $_ENV['DB_PASSWORD']);
$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
$db->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);
global $db;

/**
 *
 */
class Database
{
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

    $stmt = $db->prepare($sql);

    return $stmt->execute(array_merge($values, $where));
  }

  static function delete($table, $where){
    $sql = "DELETE FROM $table WHERE ";
    foreach ($where as $key => $value) {
      $sql .= "$key = :$key AND ";
    }
    $sql = rtrim($sql, "AND ");

    $stmt = $db->prepare($sql);

    return $stmt->execute($where);
  }

  static function get($table, $values, $where, $class){
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

    $stmt = $db->prepare($sql);

    $stmt->setFetchMode(PDO::FETCH_CLASS, $class);
    $stmt->execute(array_merge($values, $where));

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

    $stmt = $db->prepare($sql);

    $stmt->execute($values);
    return $db->lastInsertId();
  }
}
