
exports.up = function(knex, Promise) {
    return knex.schema.createTable('callSessions', function(tbl) {
        // id (primary key)
        tbl.increments(); // creates an id (if you don't pass anything here the default name of the column will be 'id'), makes it integer, makes it autoincrement
        
        //foreign key: user id
        tbl
            .integer('userId')
            .notNullable()
            .references('id')
            .inTable('users')
            // .onUpdate('CASCADE')
            // .onDelete('CASCADE');

        // foreign key: group id
        tbl
            .integer('groupId')
            .notNullable()
            .references('id')
            .inTable('groups')
            // .onUpdate('CASCADE')
            // .onDelete('CASCADE');
        
        //callSession start time/date (in Unix Time)
        tbl
            .integer('startTime') 
        
        //callSession end time/date (in Unix Time)
        tbl
            .integer('endTime')
             
            
        //callSession duration (in seconds)
        tbl
            .integer('duration')
        
        //callSession number of participants
        tbl
            .integer('numOfParticipants')
        
        //callSession cost
        tbl
            .integer('cost')
        
        //createdAt
        tbl
            .timestamp('createdAt')
            .defaultTo(knex.fn.now())

    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('callSessions');
};