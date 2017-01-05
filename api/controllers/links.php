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

        return self::linkArr($link);
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
            $links[$key] = self::linkArr($links[$key]);
        }

        return [
            'directory' => $params['directory'],
            'page' => $page,
            'links' => $links];

    }

    static function linkArr($link){
        return [
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

    static function voteLink($params, $user){
        if(!isset($params['id'])){
            throw new \ApiException('Did not get a link id', 400);
        }

        if(!isset($params['vote']) || $params['vote'] !== 'upvote' && $params['vote'] !== 'downvote'){
            throw new \ApiException('Did not get a valid vote', 400);
        }

        $id = (int)$params['id'];
        $voteOption = $params['vote'] === 'upvote' ? 1 : 0;

        $link = \app\stores\Links::get($id);

        if(!$link){
            throw new \ApiException('Link does not exist', 400);
        }

        $vote = \app\stores\Votes::get(\app\stores\Votes::LINK, $id, $user->id);

        if(!$vote){
            $vote = \app\stores\Votes::create(\app\stores\Votes::LINK, $id, $user->id, $voteOption);
            if($vote){
                $link->addVote($voteOption);
            }
        }else{
            if($vote->vote === $voteOption){
                throw new \ApiException('You can not vote on the same option twice', 400);
            }else{
                $link->changeVote($voteOption);
                $vote->updateVote($voteOption);
            }
        }

        return self::linkArr($link);
    }
}
