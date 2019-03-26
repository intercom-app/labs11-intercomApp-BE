
exports.up = function(knex, Promise) {
    // create the users tables
    return knex.schema.createTable('users', function(tbl) {
        // user id (primary key)
        tbl.increments(); // creates an id (if you don't pass anything here the default name of the column will be 'id'), makes it integer, makes it autoincrement

        //user first name
        tbl
            .string('firstName', 128)
            .notNullable();
        
        //user last name
        tbl
            .string('lastName', 128)
            .notNullable();
        
        //user display name
        tbl
            .string('displayName', 128)
        
        //user email
        tbl
            .string('email', 128)
        
        //user phone number
        tbl
            .integer('phoneNumber', 9)
        
        //user call status
        tbl
            .boolean('callStatus')
            .defaultTo(false)
            .notNullable();
            
        //user billing subscription
        tbl
            .string('billingSubcription', 128)
            .defaultTo('free')
            .notNullable();
        
        //createdAt
        tbl
            .timestamp('createdAt')
            .defaultTo(knex.fn.now())
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('users');
};