<?php
function base64url_encode($data)
{
    return rtrim(strtr(base64_encode($data), '+/', '-_'), '=');
}

function base64url_decode($data)
{
    return base64_decode(str_pad(strtr($data, '-_', '+/'), strlen($data) % 4, '=', STR_PAD_RIGHT));
}

function get_json_body($assoc = false)
{
    $inputJSON = file_get_contents('php://input');
    $input = json_decode($inputJSON, $assoc);
    if ($input === false) {
        throw new Exception('Invalid JSON data!', 400);
    }
    return $input;
}

function getUrlMetaData($url){
    try {
        $response = file_get_contents("https://api.urlmeta.org/?url=$url");
    } catch (Exception $e) {
        return;
    }

    $responseData = json_decode($response);
    if($responseData && $responseData->result->status === "OK")
    {
        return $responseData->meta;
    }
}

function verifyImage($filePath){
    $fileTypes = [
        'image/jpeg' => 'jpg',
        'image/png' => 'png',
        'image/gif' => 'gif'
    ];
    $finfo = new \finfo(FILEINFO_MIME_TYPE);
    $mime = $finfo->file($filePath);

    if (isset($fileTypes[$mime])) {
        return $fileTypes[$mime];
    }
}
