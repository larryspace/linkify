<?php
namespace app\stores;


/**
 *
 */
class Links
{
    static function add($directoryId, $userId, $title, $url, $description, $image = NULL){
        return \Database::create('links', [
            'directory_id' => $directoryId,
            'user_id' => $userId,
            'title' => $title,
            'url' => $url,
            'description' => $description,
            'image' => $image]);
    }

    static function get($id){
        $user = \Authentication::getUser();

        $links = \Database::queryFetch('
        SELECT
            links.id,
            links.title,
            links.url,
            links.description,
            links.image,
            links.directory_id,
            links.user_id,
            links.deleted,
            links.created_at,
            links.comment_count,
            users.username,
            directories.name AS directory,
            COUNT(comments.link_id) AS comment_count,
            (links.upvotes - links.downvotes) as votes,
            (votes.vote = 1) as upvoted,
            (votes.vote = 0) as downvoted
        FROM `links`
        LEFT JOIN `votes` ON
            votes.user_id = :user_id AND
            votes.type = :type AND
            content_id = links.id
        LEFT JOIN `users` ON
            links.user_id = users.id
        LEFT JOIN `directories` ON
            links.directory_id = directories.id
        LEFT JOIN `comments` ON
            comments.link_id = links.id
        WHERE links.id = :id
        ', [
            'id' => $id,
            'user_id' => $user->id ?? NULL,
            'type' => 0,
        ], '\app\models\Link');


        return $links;
    }

    static function getLinks($id, $type, $page, $sortBy){
        $user = \Authentication::getUser();

        $perPage = 15;

        $values = [
            'user_id' => $user->id ?? NULL,
            'type' => 0,
            'start_index' => 0 + ($page - 1) * $perPage,
            'end_index' => $perPage
        ];

        $whereSql = '';
        if($id !== '1'){
            switch($type){
                case 'user':
                $whereSql = ' AND links.user_id = :id';
                break;
                case 'directory':
                $whereSql = ' AND links.directory_id = :id';
                break;
            }
            $values['id'] = $id;
        }

        $links = \Database::queryFetchAll("SELECT
            links.id,
            links.title,
            links.url,
            links.description,
            links.image,
            links.directory_id,
            links.user_id,
            links.deleted,
            links.created_at,
            links.comment_count,
            users.username,
            directories.name AS directory,
            (links.upvotes - links.downvotes) as votes,
            ((links.upvotes - links.downvotes)/ (TIMESTAMPDIFF(SECOND, links.created_at, CURRENT_TIMESTAMP())/(60*60*24))) as score,
            (votes.vote = 1) as upvoted,
            (votes.vote = 0) as downvoted
        FROM `links`
        LEFT JOIN `votes` ON
            votes.user_id = :user_id AND
            votes.type = :type AND
            content_id = links.id
        LEFT JOIN `users` ON
            links.user_id = users.id
        INNER JOIN `directories` ON
            links.directory_id = directories.id
        WHERE links.deleted = 0
        $whereSql
        ORDER BY $sortBy DESC
        LIMIT :start_index, :end_index
        ", $values, '\app\models\Link');


        return $links;
    }
}
