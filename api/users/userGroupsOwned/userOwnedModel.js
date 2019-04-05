const db = require('../../../data/dbConfig.js');

module.exports = {

    getGroups: function(userId) {

        return db('usersGroupsOwnership')
            .select(
                'usersGroupsOwnership.groupId',
                'groups.name as GroupName',
            )
            .where({ userId })
            .join('groups', 'usersGroupsOwnership.groupId', 'groups.id')
    },

    getGroupsOwnedDetailed: function(userId) {

        return db('usersGroupsOwnership')
            .select(
                'usersGroupsOwnership.createdAt as ownershipCreatedAt',
                'groups.createdAt as groupCreatedAt',
                'groups.id as groupId',
                'groups.name as groupName',
                'groups.phoneNumber',
                'groups.callStatus'
            )
            .where({ userId })
            .join('groups', 'usersGroupsOwnership.groupId', 'groups.id')
    }

};