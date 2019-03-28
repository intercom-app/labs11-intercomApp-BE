
exports.up = function(knex, Promise) {
    return knex.schema.createTable('usersGroupsOwnership', function(tbl) {
            tbl.integer('userId').references('id').inTable('users').onDelete('CASCADE');
            tbl.integer('groupId').references('id').inTable('group').onDelete('CASCADE');
            tbl.timestamp('createdAt').defaultTo(knex.fn.now())
        })
  };
  
  exports.down = function(knex, Promise) {
    // drop the usersGroupsOwnership table
    return knex.schema.dropTableIfExists('usersGroupsOwnership');
  };
