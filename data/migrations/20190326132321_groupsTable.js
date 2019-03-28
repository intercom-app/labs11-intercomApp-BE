exports.up = function(knex, Promise) {
    // create the users tables
    return knex.schema.createTable('groups', function(tbl) {
        // id (primary key)
        tbl.increments(); // creates an id (if you don't pass anything here the default name of the column will be 'id'), makes it integer, makes it autoincrement

        //group name
        tbl
            .string('name', 128)
            .notNullable();

        //group phone number
        tbl
            .string('phoneNumber', 12)

        //group call status
        tbl
            .boolean('callStatus')
            .defaultTo(false)

        //createdAt
        tbl
            .timestamp('createdAt')
            .defaultTo(knex.fn.now())

    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('groups');
};