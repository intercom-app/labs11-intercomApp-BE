const db = require('../../../data/dbConfig.js');

module.exports = {

    getGroups: function(userId) {
        return db('usersGroupsInvitations')
        .select(
            'usersGroupsInvitations.groupId', 
            'groups.name as GroupName',
        )
        .where({ userId })
        .join('groups', 'usersGroupsInvitations.groupId', 'groups.id')
    }
    
};