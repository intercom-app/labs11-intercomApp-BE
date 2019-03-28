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
    }

};