<?php
namespace app\controllers;

/**
 *
 */
class Comments
{
    static function voteComment($params, $user){
        if(!isset($params['id'])){
            throw new \ApiException('Did not get a link id', 400);
        }

        if(!isset($params['vote']) || $params['vote'] !== 'upvote' && $params['vote'] !== 'downvote'){
            throw new \ApiException('Did not get a valid vote', 400);
        }

        $id = (int)$params['id'];
        $voteOption = $params['vote'] === 'upvote' ? 1 : 0;

        $comment = \app\stores\Comments::get($id);

        if(!$comment){
            throw new \ApiException('Comment does not exist', 400);
        }

        $vote = \app\stores\Votes::get(\app\stores\Votes::COMMENT, $id, $user->id);

        if(!$vote){
            $vote = \app\stores\Votes::create(\app\stores\Votes::COMMENT, $id, $user->id, $voteOption);
            if($vote){
                $comment->addVote($voteOption);
            }
        }else{
            if($vote->vote === $voteOption){
                throw new \ApiException('You can not vote on the same option twice', 400);
            }else{
                $comment->changeVote($voteOption);
                $vote->updateVote($voteOption);
            }
        }

        return [
            'id'=>$comment->id,
            'upvoted'=>$comment->upvoted,
            'downvoted'=>$comment->downvoted,
            'votes'=>$comment->votes
        ];
    }

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

        $link->increaseCommentCount();
        $comment = \app\stores\Comments::get($commentId);

        return $comment;
    }
}
