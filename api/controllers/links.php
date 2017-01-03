<?php
namespace app\controllers;

/**
 *
 */
class Links
{

    static function newLink($params, $user){
        $postBody = get_json_body(true);

        $directory = \app\stores\Directory::getDirectory($params['directory']);

        if(!$directory){
            throw new \ApiException('FormError', 400, ['_error' => 'Directory "' . $params['directory'] . '" doesn\'t exist']);
        }

        $errors = \FormValidator::validate($postBody,
          [
              'title' => 'required|string:3,64',
              'link' => 'required|url|string:6,128'
          ]);

        if($errors){
            throw new \ApiException('FormError', 400, $errors);
        }

        try {
            $id = \app\stores\Links::add($directory->id, $user->id, $postBody['title'], $postBody['link']);
        } catch (Exception $e) {
            throw new \ApiException('FormError', 400, ['_error' => 'Could not add link!']);
        }

        $link = \app\stores\Links::get($id);

        return $link;
    }

    static function getLinks($params){
        if($params['directory'] === 'all'){
            return \app\stores\Links::getLinksAllLinks();
        }


        $directory = \app\stores\Directory::getDirectory($params['directory']);

        if(!$directory){
            throw new \ApiException('Directory does not exist', 404);
        }

        $links = \app\stores\Links::getLinksByDirectory($directory->id);

        return $links;

    }
}
