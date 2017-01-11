<?php
namespace app\stores;

/**
 *
 */
class Comments
{
    static $users = [];

    static function comment($comment){
        if(!isset(self::$users[$comment->user_id])){
            $user = User::fetch($comment->user_id, [
                'username',
                'avatar'
            ]);
            if($user){
                $user->avatar = 'http://localhost/' . $user->avatar;
                self::$users[$comment->user_id] = $user;
            }
        }else{
            $user = self::$users[$comment->user_id];
        }

        return [
            'id' => $comment->id,
            'content' => $comment->content,
            'link_id' => $comment->link_id,
            'created_at' => $comment->created_at,
            'updated_at' => $comment->updated_at,
            'parent_id' => $comment->parent_id,
            'author' => $user,
            'votes' => $comment->votes,
            'upvoted' => $comment->upvoted,
            'downvoted' => $comment->downvoted
        ];
    }

    static function comments($comments){
        foreach ($comments as $key => $comment) {
            $comments[$key] = self::comment($comment);
        }
        return $comments;
    }

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
            comments.user_id,
            users.username AS author,
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

        return self::comment($comment);
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
            comments.user_id,
            users.username AS author,
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


        return self::comments($comments);
    }
}
