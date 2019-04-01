
exports.up = function(knex, Promise) {
    return knex.schema.createTable('usersGroupsMembership', function(tbl) {
            tbl.integer('userId').references('id').inTable('users').onDelete('CASCADE');
            tbl.integer('groupId').references('id').inTable('groups').onDelete('CASCADE');
            tbl.timestamp('createdAt').defaultTo(knex.fn.now())
        })
  };
  
  exports.down = function(knex, Promise) {
    // drop the usersGroupsMembership table
    return knex.schema.dropTableIfExists('usersGroupsMembership');
  };
