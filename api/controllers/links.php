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
        $page = (int)($params['page'] ?? 1);
        if(!$page) $page = 1;

        $links = [];
        if($params['directory'] === 'all'){
            $links = \app\stores\Links::getLinksAllLinks($page);
        }else{
            $directory = \app\stores\Directory::getDirectory($params['directory']);

            if(!$directory){
                throw new \ApiException('Directory does not exist', 404);
            }

            $links = \app\stores\Links::getLinksByDirectory($directory->id, $page);
        }

        foreach ($links as $key => $value) {
            $link = $links[$key];
            $links[$key] = [
                'id' => $link->id,
                'title' => $link->title,
                'url' => $link->url,
                'image' => $link->image,
                'votes' => $link->votes,
                'directory_id' => $link->directory_id,
                'upvoted' => $link->upvoted ? true : false,
                'downvoted' => $link->downvoted ? true : false,
                'user_id' => $link->user_id,
                'created_at' => $link->created_at
            ];
        }

        return [
            'directory' => $params['directory'],
            'page' => $page,
            'links' => $links];

    }
}
