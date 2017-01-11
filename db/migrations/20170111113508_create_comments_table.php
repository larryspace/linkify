<?php

use Phinx\Migration\AbstractMigration;

class CreateCommentsTable extends AbstractMigration
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
        $table = $this->table('comments');
        $table->addColumn('link_id', 'integer')
              ->addColumn('user_id', 'integer', ['null' => true])
              ->addColumn('parent_id', 'integer', ['null' => true])
              ->addColumn('content', 'string', ['limit' => 512])
              ->addColumn('downvotes', 'integer', ['default' => 0])
              ->addColumn('upvotes', 'integer', ['default' => 0])
              ->addTimestamps()
              ->addForeignKey('link_id', 'links', 'id', ['delete'=> 'CASCADE', 'update'=> 'CASCADE'])
              ->addForeignKey('user_id', 'users', 'id', ['delete'=> 'SET_NULL', 'update'=> 'CASCADE'])
              ->addForeignKey('parent_id', 'comments', 'id', ['delete'=> 'SET_NULL', 'update'=> 'CASCADE'])
              ->create();
    }
}
