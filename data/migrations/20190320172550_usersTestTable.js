exports.up = function(knex, Promise) {
    // create the users tables
    return knex.schema.createTable('users', function(tbl) {
        // user id (primary key)
        tbl.increments(); // creates an id (if you don't pass anything here the default name of the column will be 'id'), makes it integer, makes it autoincrement

        //user name
        tbl
            .string('name', 128)
            .notNullable();
        
        //user display name
        tbl
            .string('displayName', 128)
            .notNullable();
    })
}

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('users');
}
