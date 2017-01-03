<?php

use Phinx\Migration\AbstractMigration;

class AddLinksDirectoryConstraint extends AbstractMigration
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
        $table->addColumn('directory_id', 'integer', ['after' => 'image'])
              ->addForeignKey('directory_id', 'directories', 'id', ['delete'=> 'CASCADE', 'update'=> 'CASCADE'])
              ->update();
    }

    public function up()
    {
        $table = $this->table('links');
        $table->changeColumn('image', 'string', ['limit' => 128, 'null' => true])
              ->update();
    }
}
