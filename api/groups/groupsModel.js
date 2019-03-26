const db = require('../../data/dbConfig.js');

module.exports = {

    getAllGroups: function() {
        return db('groups');
    },

    getGroupByID: function(id) {
        return db('groups').where({ id }).first();
    },    

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

    getGroupActivity: function(groupId) {

        return db('activities').where({ groupId })

    },
};