<?php

use Phinx\Migration\AbstractMigration;

class CreateVotesTable extends AbstractMigration
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
        $table = $this->table('votes');
        $table->addColumn('type', 'integer')
              ->addColumn('vote', 'boolean')
              ->addColumn('content_id', 'integer')
              ->addColumn('user_id', 'integer')
              ->addForeignKey('user_id', 'users', 'id', ['delete'=> 'CASCADE', 'update'=> 'CASCADE'])
              ->create();

       $table = $this->table('links');
       $table->addColumn('downvotes', 'integer', ['after' => 'image', 'default' => 0])
             ->addColumn('upvotes', 'integer', ['after' => 'image', 'default' => 0])
             ->update();
    }
}
