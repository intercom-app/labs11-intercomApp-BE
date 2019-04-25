
exports.up = function(knex, Promise) {
    // create the users tables
    return knex.schema.createTable('users', function(tbl) {
        // user id (primary key)
        tbl.increments(); // creates an id (if you don't pass anything here the default name of the column will be 'id'), makes it integer, makes it autoincrement
        
        //user stripeId
        tbl
        .string('stripeId', 128)
        .defaultTo(null)
        // .notNullable()      // commented out to avoid having to assign unique id to mockUsers seed file
        // .unique()

        //user first name
        tbl
            .string('firstName', 128)
        
        //user last name
        tbl
            .string('lastName', 128)
        //user avatar
        tbl
            .string('avatar', 256)
            .defaultTo(null)
            
        //user display name
        tbl
            .string('displayName', 128)
            .notNullable()
        
        //user email
        tbl
            .string('email', 128)
            .notNullable()
            .unique()
        
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
        
        //user account balance
        tbl
            .decimal('accountBalance',4,2)
            // .float('accountBalance')
            .defaultTo(0)
        
        //user last 4 credit card digits
        tbl
            .string('last4', 4)
            .defaultTo(null)
        
        //createdAt
        tbl
            .timestamp('createdAt')
            .defaultTo(knex.fn.now())
        

    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('users');
};