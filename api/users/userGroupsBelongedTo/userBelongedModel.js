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
    },

    getGroupsBelongedDetailed: function(userId) {

        return db('usersGroupsMembership')
            .select(
                'usersGroupsMembership.createdAt as membershipCreatedAt',
                'groups.createdAt as groupCreatedAt',
                'groups.id as groupId',
                'groups.name as groupName',
                'groups.phoneNumber',
                'groups.callStatus'
            )
            .where({ userId })
            .join('groups', 'usersGroupsMembership.groupId', 'groups.id')
    }
    
};