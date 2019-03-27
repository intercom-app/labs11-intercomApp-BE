const db = require('../../../data/dbConfig.js');

module.exports = {

    getGroupMembers: function(groupId) {

        return db('usersGroupsMembership')
            .select(
                'usersGroupsMembership.groupId', 
                'usersGroupsMembership.userId', 
                'users.displayName',
            )
            .where({ groupId })
            .join('users', 'usersGroupsMembership.userId', 'users.id')

    },
    
};