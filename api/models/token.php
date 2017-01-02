<?php

namespace app\models;

use app\Model;

class Token extends Model
{

  static $table = "tokens";

  function __construct()
  {
    $data = json_encode([
      'id' => $this->id,
      'hash' => $this->hash,
      'user_id' => $this->user_id,
      'expires' => $this->expires
    ]);

    $encrypted = openssl_encrypt($data, getenv('TOKEN_ENCRYPTION_ALG'), base64_decode(getenv('TOKEN_ENCRYPTION_KEY')), OPENSSL_RAW_DATA, base64_decode(getenv('TOKEN_ENCRYPTION_IV')));
    $encryptedBase64 = base64url_encode($encrypted);

    $this->base64String = $encryptedBase64;
  }

  public function toString(){
    return $this->base64String;
  }

  static function create($userId, $type, $expires){
    $hash = md5(uniqid('', true));

    \Database::create('tokens', [
      'hash' => $hash,
      'user_id' => $userId,
      'expires' => $expires,
      'type' => $type
    ]);

    return self::getById(\Database::get()->lastInsertId(), $hash);
  }

  static function getById($id, $hash){

    $select = ['id', 'hash', 'user_id', 'type', 'expires'];
    $where = ['id' => $id, 'hash'=>$hash];

    $token = \Database::fetch('tokens', $select, $where, '\app\models\Token');

    return $token;
  }

  static function get($token){
    $data = openssl_decrypt(base64url_decode($token), getenv('TOKEN_ENCRYPTION_ALG'), base64_decode(getenv('TOKEN_ENCRYPTION_KEY')), OPENSSL_RAW_DATA, base64_decode(getenv('TOKEN_ENCRYPTION_IV')));
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
