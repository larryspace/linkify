<?php
namespace app\stores;

/**
 *
 */
class Comments
{
    static $users = [];

    static function add($linkId, $userId, $parentId, $content){
        return \Database::create('comments', [
            'link_id' => $linkId,
            'user_id' => $userId,
            'parent_id' => $parentId,
            'content' => $content
        ]);
    }

    static function get($id){
        $user = \Authentication::getUser();

        $comment = \Database::queryFetch('
        SELECT
            comments.id,
            comments.content,
            comments.link_id,
            comments.created_at,
            comments.updated_at,
            comments.parent_id,
            comments.deleted,
            comments.user_id,
            (comments.upvotes - comments.downvotes) as votes,
            (votes.vote = 1) as upvoted,
            (votes.vote = 0) as downvoted
        FROM `comments`
        LEFT JOIN `votes` ON
            votes.user_id = :user_id AND
            votes.type = :type AND
            content_id = comments.id
        LEFT JOIN `users` ON
            comments.user_id = users.id
        WHERE comments.id = :id
        ', [
            'id' => $id,
            'user_id' => $user->id ?? NULL,
            'type' => 1,
        ], '\app\models\Comment');

        return $comment;
    }

    static function getComments($linkId, $page, $sortBy){
        $user = \Authentication::getUser();

        $perPage = 10;

        $values = [
            'user_id' => $user->id ?? NULL,
            'type' => 1,
            'link_id' => $linkId,
            //'start_index' => 0 + ($page - 1) * $perPage,
            //'end_index' => $perPage
        ];

        $comments = \Database::queryFetchAll("
        SELECT
            comments.id,
            comments.content,
            comments.link_id,
            comments.created_at,
            comments.updated_at,
            comments.parent_id,
            comments.deleted,
            comments.user_id,
            (comments.upvotes - comments.downvotes) as votes,
            (votes.vote = 1) as upvoted,
            (votes.vote = 0) as downvoted
        FROM `comments`
        LEFT JOIN `votes` ON
            votes.user_id = :user_id AND
            votes.type = :type AND
            content_id = comments.id
        LEFT JOIN `users` ON
            comments.user_id = users.id
        WHERE comments.link_id = :link_id
        ORDER BY $sortBy DESC
        ", $values, '\app\models\Comment');


        return $comments;
    }
}
