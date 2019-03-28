const db = require('../../../data/dbConfig.js');

module.exports = {

    getParticipants: function(groupId) {

        return db('usersGroupsParticipants')
            .select(
                'usersGroupsParticipants.groupId', 
                'usersGroupsParticipants.userId', 
                'users.displayName',
            )
            .where({ groupId })
            .join('users', 'usersGroupsParticipants.userId', 'users.id')

    },

    addParticipant: async function(participant) {
        await db('usersGroupsParticipants').insert(participant);
        return this.getParticipants(participant.groupId)
    },

    deleteParticipant: async function(userId, groupId) {
        await db('usersGroupsParticipants').where({ userId, groupId }).del();
        return this.getParticipants(groupId)
    },
    
};