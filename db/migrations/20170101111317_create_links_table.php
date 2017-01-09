<?php

use Phinx\Migration\AbstractMigration;

class CreateLinksTable extends AbstractMigration
{
    /**
     * Change Method.
     *
     * Write your reversible migrations using this method.
     *
     * More information on writing migrations is available here:
     * http://docs.phinx.org/en/latest/migrations.html#the-abstractmigration-class
     *
     * The following commands can be used in this method and Phinx will
     * automatically reverse them when rolling back:
     *
     *    createTable
     *    renameTable
     *    addColumn
     *    renameColumn
     *    addIndex
     *    addForeignKey
     *
     * Remember to call "create()" or "update()" and NOT "save()" when working
     * with the Table class.
     */
    public function change()
    {
        $table = $this->table('links');
        $table->addColumn('title', 'string', ['limit' => 128])
              ->addColumn('url', 'string', ['limit' => 128])
              ->addColumn('image', 'string', ['limit' => 128, 'null' => true])
              ->addColumn('user_id', 'integer', ['null' => true])
              ->addTimestamps()
              ->addForeignKey('user_id', 'users', 'id', ['delete'=> 'SET_NULL', 'update'=> 'CASCADE'])
              ->create();
    }
}
