const { getUserById } = require('../usersModel');
const { getGroupsOwnedDetailed } = require('../userGroupsOwned/userOwnedModel');
const { getGroupsBelongedDetailed } = require('../userGroupsBelongedTo/userBelongedModel');
const { getGroupsInvitedDetailed } = require('../userGroupsInvitedTo/userInvitedModel');

module.exports = {

    getUserDetailed: async function(id) {

        const user = await getUserById(id);
        const groupsOwned = await getGroupsOwnedDetailed(id);
        const groupsBelongedTo = await getGroupsBelongedDetailed(id);
        const groupsInvitedTo = await getGroupsInvitedDetailed(id);

        return {
            ...user,
            groupsOwned,
            groupsBelongedTo,
            groupsInvitedTo
        }
    }
    
};