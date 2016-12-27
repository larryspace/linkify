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

        if($size > 1024 * 1024 * 5) {
            throw new \ApiException('FormError', 400, ['avatar' => 'Max filesize 5MB']);
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
        $newPath = sprintf('uploads/avatars/%s.%s',
                            sha1_file($_FILES['avatar']['tmp_name']),
                            $ext
                        );

        move_uploaded_file($_FILES['avatar']['tmp_name'], $newPath);

        return ['avatar' => $newPath];
    }
}
