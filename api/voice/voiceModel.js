// *** CHECK CORRECT PATH LOCATION
const db = require('../../../data/dbConfig.js');

module.exports = {

    // function params takes in group phone number
    getGroupMembers: function(phoneNumber) {
        // Searches users groups membership junction table
        return db('usersGroupsMembership')
        // Finds members of group and return group id, user id, and user name
        // You can add more user information if you need by just adding users.<<infoRequired>>
            .select(
                'usersGroupsMembership.groupId', 
                'usersGroupsMembership.userId', 
                'users.displayName',
                'users.phoneNumber',
            )
        // Finds by group phone number
            .where({ phoneNumber })
        // Joins users table by junction table user id
            .join('users', 'usersGroupsMembership.userId', 'users.id')

    },
    
};