const { getUserById } = require('../usersModel');
const { getGroupsOwnedDetailed } = require('../userGroupsOwned/userOwnedModel');
const { getGroupsBelongedDetailed } = require('../userGroupsBelongedTo/userBelongedModel');
const { getGroupsInvitedDetailed } = require('../userGroupsInvitedTo/userInvitedModel');
const { getGroupActivityDetailed } = require('../../groups/groupActivities/groupActivitiesModel');

module.exports = {

    getUserDetailed: async function(id) {

        const user = await getUserById(id);
        let groupsOwned = await getGroupsOwnedDetailed(id);
        let groupsBelongedTo = await getGroupsBelongedDetailed(id);
        let groupsInvitedTo = await getGroupsInvitedDetailed(id);

        groupsOwned = await this.getActivites(groupsOwned);
        groupsBelongedTo = await this.getActivites(groupsBelongedTo);
        groupsInvitedTo = await this.getActivites(groupsInvitedTo);

        return {
            ...user,
            groupsOwned,
            groupsBelongedTo,
            groupsInvitedTo
        }
    },

    getActivites: async function (groups) {  
        const promises = groups.map(async group => {
            const activities = await getGroupActivityDetailed(group.groupId)
            return ({...group, activities})
        })
        const results = await Promise.all(promises) 
        return results
    }
    
};