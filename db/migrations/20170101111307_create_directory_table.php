<?php

use Phinx\Migration\AbstractMigration;

class CreateDirectoryTable extends AbstractMigration
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
        $table = $this->table('directories');
        $table->addColumn('name', 'string', ['limit' => 32])
              ->addColumn('description', 'string', ['limit' => 128])
              ->addColumn('default', 'boolean', ['default' => false])
              ->addColumn('banner', 'string', ['limit' => 128])
              ->addColumn('creator', 'integer', ['null' => true])
              ->addTimestamps()
              ->addIndex(['name'], ['unique' => true])
              ->addForeignKey('creator', 'users', 'id', ['delete'=> 'SET_NULL', 'update'=> 'CASCADE'])
              ->create();
    }
}
