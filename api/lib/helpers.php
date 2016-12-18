<?php
function base64url_encode($data) {
  return rtrim(strtr(base64_encode($data), '+/', '-_'), '=');
}

function base64url_decode($data) {
  return base64_decode(str_pad(strtr($data, '-_', '+/'), strlen($data) % 4, '=', STR_PAD_RIGHT));
}

function get_json_body($assoc){
    $inputJSON = file_get_contents('php://input');
    $input = json_decode($inputJSON, $assoc);
    if(!$input){
        throw new Exception('Invalid JSON data!', 400);
    }
    return $input;
}
