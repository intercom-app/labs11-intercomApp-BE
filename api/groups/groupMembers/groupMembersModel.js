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

    getGroupMembersDetailed: function(groupId) {

        return db('usersGroupsMembership')
            .select(
                'usersGroupsMembership.createdAt as memberCreatedAt', 
                'users.*',
            )
            .where({ groupId })
            .join('users', 'usersGroupsMembership.userId', 'users.id')

    },

    addGroupMember: async function(member) {
        await db('usersGroupsMembership').insert(member);
        return this.getGroupMembers(member.groupId)
    },

    deleteGroupMember: async function(userId, groupId) {
        await db('usersGroupsMembership').where({ userId, groupId }).del();
        return this.getGroupMembers(groupId)
    },
    
};