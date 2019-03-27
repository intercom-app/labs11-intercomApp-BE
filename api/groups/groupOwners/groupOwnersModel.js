const db = require('../../../data/dbConfig.js');

module.exports = {

    getGroupOwners: function(groupId) {

        return db('usersGroupsOwnership')
            .select(
                'usersGroupsOwnership.groupId', 
                'usersGroupsOwnership.userId', 
                'users.displayName',
            )
            .where({ groupId })
            .join('users', 'usersGroupsOwnership.userId', 'users.id')

    },
    
};