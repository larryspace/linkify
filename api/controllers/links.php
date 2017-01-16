<?php
namespace app\controllers;

/**
 *
 */
class Links
{
    public static function deleteLink($params, $user)
    {
        $postBody = get_json_body(true);

        $id = (int)$params['id'];

        if ($id===0) {
            throw new \ApiException('Link does not exist', 400);
        }

        $link = \app\stores\Links::get($id);

        if (!$link) {
            throw new \ApiException('Link does not exist', 400);
        }

        if ($link->author->id !== $user->id) {
            throw new \ApiException('You can not delete a link that are not yours', 400);
        }

        $link->author->addTo('link_count', -1);
        $link->delete();

        return $link;
    }

    public static function editLink($params, $user)
    {
        $postBody = get_json_body(true);

        $id = (int)$params['id'];

        if ($id===0) {
            throw new \ApiException('Link does not exist', 400);
        }

        $link = \app\stores\Links::get($id);

        if (!$link) {
            throw new \ApiException('Link does not exist', 400);
        }

        if ($link->user_id !== $user->id) {
            throw new \ApiException('You can not edit a link that are not yours', 400);
        }

        $errors = \FormValidator::validate($postBody,
          [
              'description' => 'required|string:6,1024'
          ]);

        if ($errors) {
            throw new \ApiException('FormError', 400, $errors);
        }

        $link->updateDescription($postBody['description']);

        return $link;
    }

    public static function newLink($params, $user)
    {
        $postBody = get_json_body(true);

        $directory = \app\stores\Directory::getDirectory($params['directory']);

        if (!$directory) {
            throw new \ApiException('FormError', 400, ['_error' => 'Directory "' . $params['directory'] . '" doesn\'t exist']);
        }

        $errors = \FormValidator::validate($postBody,
          [
              'title' => 'required|string:3,64',
              'link' => 'required|url|string:6,128',
              'description' => 'required|string:6,1024'
          ]);

        if ($errors) {
            throw new \ApiException('FormError', 400, $errors);
        }

        try {
            $id = \app\stores\Links::add($directory->id, $user->id, $postBody['title'], $postBody['link'], $postBody['description']);
        } catch (Exception $e) {
            throw new \ApiException('FormError', 400, ['_error' => 'Could not add link!']);
        }

        $link = \app\stores\Links::get($id);
        $link->author->addTo('link_count', 1);

        return $link;
    }

    public static function getLink($params)
    {
        $id = (int)$params['id'];
        $link = \app\stores\Links::get($id);

        if (!$link) {
            throw new \ApiException('Link does not exist', 404);
        }

        return $link;
    }

    public static function getLinks($params)
    {
        $page = (int)($params['page'] ?? 1);
        if (!$page) {
            $page = 1;
        }

        $sortBy = $params['sort'] === 'hot' ? 'score' : 'created_at';

        $links = [];
        if ($params['directory'] === 'all') {
            $links = \app\stores\Links::getLinks('all', $page, $sortBy);
        } else {
            $directory = \app\stores\Directory::getDirectory($params['directory']);

            if (!$directory) {
                throw new \ApiException('Directory does not exist', 404);
            }

            $links = \app\stores\Links::getLinks($directory->id, $page, $sortBy);
        }

        return $links;
    }

    public static function getLinksV2($params)
    {
        $page = (int)$params['page'];
        $id = $params['id'];
        $sort = $params['sort'];
        $type = $params['type'];

        $sortBy = $sort === 'hot' ? 'score' : 'created_at';

        $links = \app\stores\Links::getLinks($id, $type, $page, $sortBy);

        return $links;
    }

    public static function voteLink($params, $user)
    {
        if (!isset($params['id'])) {
            throw new \ApiException('Did not get a link id', 400);
        }

        if (!isset($params['vote']) || $params['vote'] !== 'upvote' && $params['vote'] !== 'downvote') {
            throw new \ApiException('Did not get a valid vote', 400);
        }

        $id = (int)$params['id'];
        $voteOption = $params['vote'] === 'upvote' ? 1 : 0;

        $link = \app\stores\Links::get($id);

        if (!$link) {
            throw new \ApiException('Link does not exist', 400);
        }

        $vote = \app\stores\Votes::get(\app\stores\Votes::LINK, $id, $user->id);

        if (!$vote) {
            $vote = \app\stores\Votes::create(\app\stores\Votes::LINK, $id, $user->id, $voteOption);
            if ($vote) {
                $link->addVote($voteOption);
                $link->author->addTo('karma', $link->upvoted ? 1 : -1);
            }
        } else {
            if ($vote->vote === $voteOption) {
                throw new \ApiException('You can not vote on the same option twice', 400);
            } else {
                $link->changeVote($voteOption);
                $vote->updateVote($voteOption);
                $link->author->addTo('karma', $link->upvoted ? 2 : -2);
            }
        }

        return [
            'id'=>$link->id,
            'upvoted'=>$link->upvoted,
            'downvoted'=>$link->downvoted,
            'votes'=>$link->votes,
            'author' => $link->author
        ];
    }
}
