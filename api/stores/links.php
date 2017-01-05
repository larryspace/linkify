<?php
namespace app\stores;


/**
 *
 */
class Links
{
    static function add($directoryId, $userId, $title, $url, $image = NULL){
        return \Database::create('links', [
            'directory_id' => $directoryId,
            'user_id' => $userId,
            'title' => $title,
            'url' => $url,
            'image' => $image]);
    }

    static function get($id){
        $user = \Authentication::getUser();

        $links = \Database::queryFetch('
        SELECT
            links.id,
            links.title,
            links.url,
            links.image,
            links.directory_id,
            links.user_id,
            links.created_at,
            (links.upvotes - links.downvotes) as score,
            (votes.vote = 1) as upvoted,
            (votes.vote = 0) as downvoted
        FROM `links`
        LEFT JOIN `votes` ON
            votes.user_id = :user_id AND
            votes.type = :type AND
            content_id = links.id
        WHERE links.id = :id
        ', [
            'id' => $id,
            'user_id' => $user->id ?? NULL,
            'type' => 0,
        ], '\app\models\Link');


        return $links;
    }

    static function getLinksByDirectory($directoryId, $page){
        $user = \Authentication::getUser();

        $links = \Database::queryFetchAll('
        SELECT
            links.id,
            links.title,
            links.url,
            links.image,
            links.directory_id,
            links.user_id,
            links.created_at,
            (links.upvotes - links.downvotes) as votes,
            ((links.upvotes - links.downvotes)/ (TIMESTAMPDIFF(MINUTE, links.created_at, CURRENT_TIMESTAMP())/(60*24))) as score,
            (votes.vote = 1) as upvoted,
            (votes.vote = 0) as downvoted
        FROM `links`
        LEFT JOIN `votes` ON
            votes.user_id = :user_id AND
            votes.type = :type AND
            content_id = links.id
        WHERE directory_id = :directory_id
        ORDER BY score DESC
        LIMIT :start_index, :end_index
        ', [
            'directory_id' => $directoryId,
            'user_id' => $user->id ?? NULL,
            'type' => 0,
            'start_index' => 1 + ($page - 1) * 5,
            'end_index' => 5,
        ], '\app\models\Link');


        return $links;
    }

    static function getLinksAllLinks($page){
        $user = \Authentication::getUser();

        $links = \Database::queryFetchAll('
        SELECT
            links.id,
            links.title,
            links.url,
            links.image,
            links.directory_id,
            links.user_id,
            links.created_at,
            (links.upvotes - links.downvotes) as votes,
            ((links.upvotes - links.downvotes)/ (TIMESTAMPDIFF(MINUTE, links.created_at, CURRENT_TIMESTAMP())/(60*24))) as score,
            (votes.vote = 1) as upvoted,
            (votes.vote = 0) as downvoted
        FROM `links`
        LEFT JOIN `votes` ON
            votes.user_id = :user_id AND
            votes.type = :type AND
            content_id = links.id
        ORDER BY score DESC
        LIMIT :start_index, :end_index
        ', [
            'user_id' => $user->id ?? NULL,
            'type' => 0,
            'start_index' => 1 + ($page - 1) * 5,
            'end_index' => 5,
        ], '\app\models\Link');


        return $links;
    }
}
