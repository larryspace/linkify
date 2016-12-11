<?php

namespace app\models;

use app\Model;

class Token extends Model
{
  function __construct()
  {
    $data = json_encode([
      'id' => $this->id,
      'hash' => $this->hash,
      'user_id' => $this->userId,
      'expires' => $this->expires
    ]);

    $encrypted = openssl_encrypt($data, _TOKEN_ENCRYPTION_ALG_, base64_decode(_TOKEN_ENCRYPTION_KEY_), OPENSSL_RAW_DATA, base64_decode(_TOKEN_ENCRYPTION_IV_));
    $encryptedBase64 = base64url_encode($encrypted);

    $this->base64String = $encryptedBase64;
  }

  public function toString(){
    return $this->base64String;
  }

  static function create($userId, $type, $expires){
    $hash = md5(uniqid('', true));

    Database::create('tokens', [
      'hash' => $hash,
      'user_id' => $userId,
      'expires' => $expires,
      'type' => $type
    ]);

    return self::getById($db->lastInsertId(), $hash);
  }

  static function getById($id, $hash){

    $select = ['id', 'hash', 'user_id', 'type', 'expires'];
    $where = ['id' => $id, 'hash'=>$hash];

    $token = Database::get('tokens', $select, $where, 'app\models\token');

    return $token;
  }

  static function get($token){
    $data = openssl_decrypt(base64url_decode($token), _TOKEN_ENCRYPTION_ALG_, base64_decode(_TOKEN_ENCRYPTION_KEY_), false, base64_decode(_TOKEN_ENCRYPTION_IV_));
    if(!$data){
      //throw new Exception("Couldn't decrypt token");
      return false;
    }

    $data = json_decode($data);

    $expires = strtotime($data->expires);
    if(time() > $expires){
      return false;
    }

    $token = self::getById($data->id, $data->hash);
    if(!$token){
      return false;
    }

    $expires = strtotime($token->expires);
    if(time() > $expires){
      //token expired so delete it
      $token->delete();
      return false;
    }

    return $token;
  }

}
