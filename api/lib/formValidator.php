<?php
class FormValidator
{
    private static $validations = [
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
    'url' => 'FormValidator::validateUrl',
    'unique' => 'FormValidator::validateUnique'
  ];

    public static function validate($arr, $validation)
    {
        $errors = [];

        foreach ($validation as $field => $value) {
            $validations = explode('|', $value);
            foreach ($validations as $validationType) {
                $validationConfig = explode(':', $validationType);
                if (array_key_exists($validationConfig[0], self::$validations)) {
                    $func = self::$validations[$validationConfig[0]];
                    $error = call_user_func($func, $arr[$field] ?? '', $validationConfig[1] ?? null);
                    if ($error) {
                        $errors[$field] = $error;
                        break;
                    }
                }
            }
        }

        return $errors;
    }

    private static function getCaptchaHTML()
    {
        return '<div class="g-recaptcha" data-sitekey="' . $_ENV['RECAPTCHA_PUBLIC_KEY'] . '"></div>';
    }

    private static function validateRecaptcha($value)
    {
        $verifyResponse = file_get_contents('https://www.google.com/recaptcha/api/siteverify?secret='.$_ENV['RECAPTCHA_PRIVATE_KEY'].'&response='.$value);
        $responseData = json_decode($verifyResponse);

        if (!$responseData->success) {
            return 'RECAPTCHA_ERROR';
        }
    }

    private static function validateConfirm($value, $confirmPost)
    {
        if ($value !== $_POST[$confirmPost]) {
            return 'THIS_FIELD_NEED_TO_BE_IDENTICAL_TO_' . $confirmPost;
        }

        return false;
    }

    private static function verifyPassword($password, $hash)
    {
        if (!password_verify($password, $hash)) {
            return 'Password doesnt match';
        }

        return false;
    }

    private static function validateRequired($value)
    {
        if (!$value) {
            return 'FIELD_REQUIRED';
        }


        return false;
    }

    private static function validateOption($value, $data)
    {
        $arr = explode(',', $data);
        if (!in_array($value, $arr)) {
            return 'THIS_IS_NOT_A_VALID_OPTION';
        }
    }

    private static function validateInteger()
    {
    }

    private static function validateUnique($value, $tableColumn)
    {
        $matches = [];
        preg_match("/([A-z]+)\.([A-z]+)(\.(.+))?/", $tableColumn, $matches);
        $table = $matches[1];
        $column = $matches[2];
        $exception = $matches[4] ?? null;

        if (strtolower($exception) === strtolower($value)) {
            return;
        }

        $obj = \Database::fetch($table, [], [$column => $value]);
        if ($obj) {
            return "This $column is already in use!";
        }
    }

    private static function validateRegex($value, $regex)
    {
        $options = [
      "options"=> [
        "regexp" => $regexp
      ]
    ];

        $valid = filter_var($value, FILTER_VALIDATE_REGEXP, $options);

        if (!$valid) {
            return 'INVALID_' . $regex;
        }
    }

    private static function validateString($value, $meta)
    {
        $arr = explode(',', $meta);

        $min = $arr[0];
        $max = $arr[1] ?? null;

        if ($min && $min > strlen($value)) {
            return "A minimum of $min characters is required!";
        }

        if ($max && $max < strlen($value)) {
            return "A maximum of $max characters is required!";
        }
    }

    private static function validateUrl($value)
    {
    }

    private static function validateEmail($value)
    {
        if (!$value) {
            return false;
        }

        if (!filter_var($value, FILTER_VALIDATE_EMAIL)) {
            return 'INVALID_EMAIL';
        }

        return false;
    }

    private static function validatePassword($value)
    {
        if (strlen($value) < 6) {
            return 'PASSWORD_TOO_SHORT';
        }
    }
}
