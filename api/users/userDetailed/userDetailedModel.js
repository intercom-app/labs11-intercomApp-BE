const { getUserById } = require('../usersModel');
const { getGroupsOwnedDetailed } = require('../userGroupsOwned/userOwnedModel');
const { getGroupsBelongedDetailed } = require('../userGroupsBelongedTo/userBelongedModel');
const { getGroupsInvitedDetailed } = require('../userGroupsInvitedTo/userInvitedModel');
const { getGroupActivityDetailed } = require('../../groups/groupActivities/groupActivitiesModel');
const { getParticipantsDetailed } = require('../../groups/groupCallParticipants/groupCallParticipantsModel');
const { getGroupOwnersDetailed } = require('../../groups/groupOwners/groupOwnersModel');
const { getGroupMembersDetailed } = require('../../groups/groupMembers/groupMembersModel');
const { getGroupInviteesDetailed } = require('../../groups/groupInvitees/groupInviteesModel');

module.exports = {

    getUserDetailed: async function(id) {

        const user = await getUserById(id);
        let groupsOwned = await getGroupsOwnedDetailed(id);
        let groupsBelongedTo = await getGroupsBelongedDetailed(id);
        let groupsInvitedTo = await getGroupsInvitedDetailed(id);

        groupsOwned = await this.getActivites(groupsOwned);
        groupsBelongedTo = await this.getActivites(groupsBelongedTo);
        groupsInvitedTo = await this.getActivites(groupsInvitedTo);

        groupsOwned = await this.getParticipants(groupsOwned);
        groupsBelongedTo = await this.getParticipants(groupsBelongedTo);
        groupsInvitedTo = await this.getParticipants(groupsInvitedTo);

        groupsOwned = await this.getOwners(groupsOwned);
        groupsBelongedTo = await this.getOwners(groupsBelongedTo);
        groupsInvitedTo = await this.getOwners(groupsInvitedTo);

        groupsOwned = await this.getMembers(groupsOwned);
        groupsBelongedTo = await this.getMembers(groupsBelongedTo);
        groupsInvitedTo = await this.getMembers(groupsInvitedTo);

        groupsOwned = await this.getInvitees(groupsOwned);
        groupsBelongedTo = await this.getInvitees(groupsBelongedTo);
        groupsInvitedTo = await this.getInvitees(groupsInvitedTo);

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
        return await Promise.all(promises) 
    },

    getParticipants: async function (groups) {  
        const promises = groups.map(async group => {
            const callParticipants = await getParticipantsDetailed(group.groupId)
            return ({...group, callParticipants})
        })
        return await Promise.all(promises) 
    },
  
    getOwners: async function (groups) {  
        const promises = groups.map(async group => {
            const owners = await getGroupOwnersDetailed(group.groupId)
            return ({...group, owners})
        })
        return await Promise.all(promises) 
    },  
      
    getMembers: async function (groups) {  
        const promises = groups.map(async group => {
            const members = await getGroupMembersDetailed(group.groupId)
            return ({...group, members})
        })
        return await Promise.all(promises) 
    },  
 
    getInvitees: async function (groups) {  
        const promises = groups.map(async group => {
            const invitees = await getGroupInviteesDetailed(group.groupId)
            return ({...group, invitees})
        })
        return await Promise.all(promises) 
    },  
};