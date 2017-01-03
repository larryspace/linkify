<?php
class FormValidator {
  public static $validations = [
    'required' => 'FormValidator::validateRequired',
    'string' => 'FormValidator::validateString',
    'integer' => 'FormValidator::validateInteger',
    'email' => 'FormValidator::validateEmail',
    'password' => 'FormValidator::validatePassword',
    'option' => 'FormValidator::validateOption',
    'recaptcha' => 'FormValidator::validateRecaptcha',
    'regex' => 'FormValidator::validateRegex',
    'confirm' => 'FormValidator::validateConfirm',
    'verify_password' => 'FormValidator::verifyPassword',
    'url' => 'FormValidator::validateUrl'
  ];

  public static function validate($arr, $validation){
    $errors = [];

    foreach ($validation as $field => $value) {
      $validations = explode('|', $value);
      foreach ($validations as $validationType) {
        $validationConfig = explode(':', $validationType);
        if(array_key_exists($validationConfig[0], self::$validations)){
          $func = self::$validations[$validationConfig[0]];
          $error = call_user_func($func, $arr[$field] ?? '', $validationConfig[1] ?? NULL);
          if($error){
            $errors[$field] = $error;
            break;
          }
        }
      }
    }

    return $errors;
  }

  public static function getCaptchaHTML(){
    return '<div class="g-recaptcha" data-sitekey="' . $_ENV['RECAPTCHA_PUBLIC_KEY'] . '"></div>';
  }

  public static function validateRecaptcha($value){
    $verifyResponse = file_get_contents('https://www.google.com/recaptcha/api/siteverify?secret='.$_ENV['RECAPTCHA_PRIVATE_KEY'].'&response='.$value);
    $responseData = json_decode($verifyResponse);

    if(!$responseData->success){
      return 'RECAPTCHA_ERROR';
    }
  }

  public static function validateConfirm($value, $confirmPost){
    if($value !== $_POST[$confirmPost]){
      return 'THIS_FIELD_NEED_TO_BE_IDENTICAL_TO_' . $confirmPost;
    }

    return false;
  }

  public static function verifyPassword($password, $hash){
    if(!password_verify ($password, $hash )){
        return 'Password doesnt match';
    }

    return false;
  }

  public static function validateRequired($value){
    if(!$value){
      return 'FIELD_REQUIRED';
    }


    return false;
  }

  public static function validateOption($value, $data){
    $arr = explode(',', $data);
    if(!in_array($value, $arr)){
      return 'THIS_IS_NOT_A_VALID_OPTION';
    }
  }

  public static function validateInteger(){

  }

  public static function validateRegex($value, $regex){
    $options = [
      "options"=> [
        "regexp" => $regexp
      ]
    ];

    $valid = filter_var($value, FILTER_VALIDATE_REGEXP, $options);

    if(!$valid){
      return 'INVALID_' . $regex;
    }
  }

  public static function validateString($value, $meta){
      $arr = explode(',', $meta);

      $min = $arr[0];
      $max = $arr[1] ?? NULL;

      if($min && $min > strlen($value)){
          return "A minimum of $min characters is required!";
      }

      if($max && $max < strlen($value)){
          return "A maximum of $max characters is required!";
      }
  }

  public static function validateUrl($value){
  }

  public static function validateEmail($value){
    if(!$value){
      return false;
    }

    if(!filter_var($value, FILTER_VALIDATE_EMAIL)){
      return 'INVALID_EMAIL';
    }

    return false;
  }

  public static function validatePassword($value){
    if(strlen($value) < 6){
      return 'PASSWORD_TOO_SHORT';
    }
  }

}
