const db = require('../../../data/dbConfig.js');

module.exports = {

    getGroups: function(userId) {

        return db('usersGroupsMembership')
            .select(
                'usersGroupsMembership.groupId', 
                'groups.name as GroupName',
            )
            .where({ userId })
            .join('groups', 'usersGroupsMembership.groupId', 'groups.id')
    }
    
};