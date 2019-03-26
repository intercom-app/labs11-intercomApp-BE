const db = require('../../data/dbConfig.js');

module.exports = {

    getAllGroups: function() {
        return db('groups');
    },

    getGroupByID: function(id) {
        return db('groups').where({ id }).first();
    },    

    getGroupMembers: function(groupID) {

        return db('usersGroupsMembership')
            .select(
                'usersGroupsMembership.groupId', 
                'usersGroupsMembership.userId', 
                'users.displayName',
            )
            .where({ 'groupId' : groupID })
            .join('users', 'usersGroupsMembership.userId', 'users.id')

    },

};