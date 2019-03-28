exports.up = function(knex, Promise) {
    // create the activities tables
    return knex.schema.createTable('activities', function(tbl) {
        // id (primary key)
        tbl.increments(); // creates an id (if you don't pass anything here the default name of the column will be 'id'), makes it integer, makes it autoincrement

        //foreign key: groupId
        tbl
            .integer('groupId')
            .notNullable()
            .references('id')
            .inTable('groups')
            .onDelete('CASCADE');
        
        //foreign key: userId
        tbl
            .integer('userId')
            .notNullable()
            .references('id')
            .inTable('users')
            .onDelete('CASCADE');
        
        //activity
        tbl
            .string('activity', 128)
            .notNullable();
        
        //createdAt
        tbl
            .timestamp('createdAt')
            .defaultTo(knex.fn.now())

    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('activities');
};