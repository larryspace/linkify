<?php
namespace app\controllers;

/**
 *
 */
class Comments
{
    static function getLinkComments($params){
        $linkId = (int)$params['link'];

        $page = (int)($params['page'] ?? 1);
        if(!$page) $page = 1;

        $sortBy = ($params['sort'] ?? '') === 'hot' ? 'votes' : 'created_at';

        $comments = \app\stores\Comments::getComments($linkId, $page, $sortBy);
        return $comments;
    }

    static function editComment($params, $user){
        $postBody = get_json_body(true);

        $comment = \app\stores\Comments::get((int)$params['id']);

        if(!$comment){
            throw new \ApiException('FormError', 400, ['_error' => 'Comment "' . $params['id'] . '" doesn\'t exist']);
        }

        if(strtolower($comment->author) !== strtolower($user->username)){
            throw new \ApiException('FormError', 400, ['_error' => 'This is not your comment']);
        }

        $errors = \FormValidator::validate($postBody,
          [
              'content' => 'required|string:3,256'
          ]);

        if($errors){
            throw new \ApiException('FormError', 400, $errors);
        }

        try {
            $comment->updateContent($postBody['content']);
        } catch (Exception $e) {
            throw new \ApiException('FormError', 400, ['_error' => 'Could not add comment!']);
        }

        return $comment;
    }

    static function newComment($params, $user){
        $postBody = get_json_body(true);

        $link = \app\stores\Links::get($params['link']);

        if(!$link){
            throw new \ApiException('FormError', 400, ['_error' => 'Link "' . $params['link'] . '" doesn\'t exist']);
        }

        $errors = \FormValidator::validate($postBody,
          [
              'content' => 'required|string:3,256'
          ]);

        if($errors){
            throw new \ApiException('FormError', 400, $errors);
        }

        $parent_id = (int)$postBody['parent'];
        $parent_id = $parent_id ? $parent_id : null;

        if($parent_id){
            $parent = \app\stores\Comments::get($parent_id);
            if(!$parent){
                throw new \ApiException('FormError', 400, ['_error' => 'Parent comment does not exist']);
            }
        }

        $content = $postBody['content'];

        try {
            $commentId = \app\stores\Comments::add($link->id, $user->id, $parent_id, $content);
        } catch (Exception $e) {
            throw new \ApiException('FormError', 400, ['_error' => 'Could not add comment!']);
        }

        $comment = \app\stores\Comments::get($commentId);

        return $comment;
    }
}
