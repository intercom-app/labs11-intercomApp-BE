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
    },
    
    getGroupsInvitedDetailed: function(userId) {

        return db('usersGroupsInvitations')
            .select(
                'usersGroupsInvitations.createdAt as inviteCreatedAt',
                'groups.createdAt as groupCreatedAt',
                'groups.id as groupId',
                'groups.name as groupName',
                'groups.phoneNumber',
                'groups.callStatus'
            )
            .where({ userId })
            .join('groups', 'usersGroupsInvitations.groupId', 'groups.id')
    }

};