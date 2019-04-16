

fromFormatted



exports.up = function(knex, Promise) {
    return knex.schema.createTable('callSessions', function(tbl) {
        // id (primary key)
        tbl.increments(); // creates an id (if you don't pass anything here the default name of the column will be 'id'), makes it integer, makes it autoincrement
        
        // sid 
        tbl.integer('sid')

        //foreign key: user id
        tbl
            .integer('userId')
            // .notNullable()
            .references('id')
            .inTable('users')
            // .onUpdate('CASCADE')
            // .onDelete('CASCADE');

        // foreign key: group id
        tbl
            .integer('groupId')
            // .notNullable()
            .references('id')
            .inTable('groups')
            // .onUpdate('CASCADE')
            // .onDelete('CASCADE');
        
        //callSession start time/date 
        tbl
            .string('startTime') 
        
        //callSession end time/date  
        tbl
            .string('endTime')
             
            
        //callSession duration (in minutes)
        tbl
            .integer('duration')
               
        //callSession price (dollars)
        tbl
            .float('price')
        
        //createdAt
        tbl
            .timestamp('createdAt')
            .defaultTo(knex.fn.now())

    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('callSessions');
};