<?php
namespace app;

/**
 *
 */
class Model
{
    public static $table = "";

    public function __construct()
    {
    }

    public function addTo($column, $num)
    {
        if (isset($this->{$column})) {
            $this->{$column} += $num;
        }

        $sql = "
            UPDATE `" . get_class($this)::$table . "`
            SET $column = $column + $num
            WHERE id = :id
        ";

        try {
            \Database::query($sql, [
                'id' => $this->id
            ]);
        } catch (Exception $e) {
            throw new \ApiException('Could not increase count', 400);
        }
    }

    public function _save($values)
    {
        return \Database::save(get_class($this)::$table, $values, ['id' => $this->id]);
    }

    public function _delete()
    {
        return \Database::delete(get_class($this)::$table, ['id' => $this->id]);
    }

    public static function _get($id, $values)
    {
        return \Database::get(get_class($this)::$table, $values, ['id' => $id], self::$table);
    }
}
