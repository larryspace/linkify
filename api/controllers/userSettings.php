<?php
namespace app\controllers;

/**
 *
 */
class UserSettings
{

    static function updateAvatar($params, $user){
        if(!isset($_FILES['avatar'])){
            throw new \ApiException('FormError', 400, ['avatar' => 'No Avatar']);
        }

        $name = $_FILES['avatar']['name'];
        $type = $_FILES['avatar']['type'];
        $tmp_name = $_FILES['avatar']['tmp_name'];
        $error = $_FILES['avatar']['error'];
        $size = $_FILES['avatar']['size'];

        if($_FILES['avatar']['error'] > 0){
            switch ($_FILES['avatar']['error']) {
                case UPLOAD_ERR_OK:
                    break;
                case UPLOAD_ERR_NO_FILE:
                    throw new \ApiException('FormError', 400, ['avatar' => 'No file sent']);
                case UPLOAD_ERR_INI_SIZE:
                case UPLOAD_ERR_FORM_SIZE:
                    throw new \ApiException('FormError', 400, ['avatar' => 'Exceeded filesize limit']);
                default:
                    throw new \ApiException('FormError', 400, ['avatar' => 'Unknown error']);
            }
        }

        if($size > 1024 * 1024 * 5) {
            //throw new \ApiException('FormError', 400, ['avatar' => 'Max filesize 5MB']);
        }

        $finfo = new \finfo(FILEINFO_MIME_TYPE);
        $mime = $finfo->file($_FILES['avatar']['tmp_name']);

        $fileTypes = [
            'image/jpeg' => 'jpg',
            'image/png' => 'png',
            'image/gif' => 'gif'
        ];

        if(!isset($fileTypes[$mime])){
            throw new \ApiException('FormError', 400, ['avatar' => 'Invalid file type']);
        }

        $ext = $fileTypes[$mime];
        $newPath = sprintf('uploads/avatars/%s.%s.%s',
                            sha1_file($_FILES['avatar']['tmp_name']),
                            uniqid(),
                            $ext
                        );

        move_uploaded_file($_FILES['avatar']['tmp_name'], $newPath);

        if($user->avatar){
            unlink($user->avatar);
        }

        $user->_save(['avatar' => $newPath]);

        return [
            'id' => $user->id,
            'avatar' => $newPath
        ];
    }

    static function updateInfo($params, $user){
        $postBody = get_json_body(true);

        $errors = \FormValidator::validate($postBody,
          [
              'username' => 'required|string:3,20|unique:users.username.' . $user->username,
              'email' => 'required|string:3,100|unique:users.email.' . $user->email,
              'first_name' => 'required|string:3,30',
              'last_name' => 'required|string:3,30'
          ]);

        if($errors){
            throw new \ApiException('FormError', 400, $errors);
        }


        $user->_save([
            'username' => $postBody['username'],
            'email' => $postBody['email'],
            'first_name' => $postBody['first_name'],
            'last_name' => $postBody['last_name']
        ]);

        return [
            'id' => $user->id,
            'username' => $postBody['username'],
            'email' => $postBody['email'],
            'first_name' => $postBody['first_name'],
            'last_name' => $postBody['last_name']
        ];
    }

    static function updatePassword($params, $user){
        $postBody = get_json_body(true);

        $userPw = \app\stores\User::fetch($user->id, ['password']);

        $errors = \FormValidator::validate($postBody,
          [
              'current_password' => 'required|verify_password:' . $userPw->password,
              'new_password' => 'required|password'
          ]);

        if($errors){
            throw new \ApiException('FormError', 400, $errors);
        }

        $newPasswordHash = password_hash($postBody['new_password'], PASSWORD_BCRYPT);

        $user->_save([
            'password' => $newPasswordHash
        ]);

        return;
    }
}
