<?php

use Phinx\Migration\AbstractMigration;

class AddDefaultData extends AbstractMigration
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

    public function up()
    {
        // inserting only one row
        $singleRow = [
            'id'    => 1,
            'username'  => 'Admin',
            'password'  => '',
            'email'  => 'admin@linkify.benjar.net',
            'first_name'  => '',
            'last_name'  => '',
            'link_count'  => 1337,
            'comment_count'  => 1337,
            'karma'  => 1337,
        ];

        $table = $this->table('users');
        $table->insert($singleRow);
        $table->saveData();

        // inserting multiple rows
        $rows = [
            [
              'id'    => 1,
              'name'  => 'All',
              'description' => '',
              'default' => 1,
              'creator' => 1
            ],
            [
              'id'    => 2,
              'name'  => 'Games',
              'description' => '',
              'default' => 1,
              'creator' => 1
            ],
            [
              'id'    => 3,
              'name'  => 'Programming',
              'description' => '',
              'default' => 1,
              'creator' => 1
            ],
            [
              'id'    => 4,
              'name'  => 'Pictures',
              'description' => '',
              'default' => 1,
              'creator' => 1
            ],
            [
              'id'    => 5,
              'name'  => 'Music',
              'description' => '',
              'default' => 1,
              'creator' => 1
            ],
            [
              'id'    => 6,
              'name'  => 'Funny',
              'description' => '',
              'default' => 1,
              'creator' => 1
            ]
        ];

        // this is a handy shortcut
        $this->insert('directories', $rows);
    }

    /**
     * Migrate Down.
     */
    public function down()
    {
        $this->execute('DELETE FROM users WHERE id = 1');
        $this->execute('DELETE FROM directories');
    }
}
