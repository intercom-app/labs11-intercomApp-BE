const db = require('../../../data/dbConfig.js');

module.exports = {

    getGroupInvitees: function(groupId) {

        return db('usersGroupsInvitations')
            .select(
                'usersGroupsInvitations.groupId', 
                'usersGroupsInvitations.userId', 
                'users.displayName',
            )
            .where({ groupId })
            .join('users', 'usersGroupsInvitations.userId', 'users.id')

    },

    addGroupInvitee: async function(invitee) {
        await db('usersGroupsInvitations').insert(invitee);
        return this.getGroupInvitees(invitee.groupId)
    },

    deleteGroupInvitee: async function(userId, groupId) {
        await db('usersGroupsInvitations').where({ userId, groupId }).del();
        return this.getGroupInvitees(groupId)
    },
    
};