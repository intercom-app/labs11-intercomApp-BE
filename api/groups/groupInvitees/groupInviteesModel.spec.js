const groupModel = require('./groupInviteesModel.js');
const db = require('../../../data/dbConfig.js');
const { dbReset, user1, user2, newInvitee1, newInvitee2 } = require('../../serverTestReset.js');

describe('groupInviteesModel', () => {

    let res;
    const id = 1;

    beforeEach(async () => {
        await dbReset();
    })

    describe('getGroupInvitees()', () => {

        it('should return list all invitees of group by specified group ID', async () => {
            res = await groupModel.getGroupInvitees(id);
            expect(res).toHaveLength(1);
            expect(res[0].groupId).toBe(newInvitee1.groupId);
            expect(res[0].userId).toBe(newInvitee1.userId);
            expect(res[0].displayName).toBe(user1.displayName);

        });

    });

    describe('addGroupInvitee()', () => {

        it('should add new invitee to group', async () => {
            res = await groupModel.addGroupInvitee(newInvitee2);
            expect(res).toHaveLength(2);
            expect(res[1].groupId).toBe(newInvitee2.groupId);
            expect(res[1].userId).toBe(newInvitee2.userId);
            expect(res[1].displayName).toBe(user2.displayName);

        });

    });

    describe('deleteGroupInvitee()', () => {

        it('should delete the group invitee by sepcified id and return updated group', async () => {
            await db('usersGroupsInvitations').insert(newInvitee2);

            const resInit = await groupModel.getGroupInvitees(id);
            expect(resInit).toHaveLength(2);
            expect(resInit[1].groupId).toBe(newInvitee2.groupId);
            expect(resInit[1].userId).toBe(newInvitee2.userId);
            expect(resInit[1].displayName).toBe(user2.displayName);

            await groupModel.deleteGroupInvitee(newInvitee2.userId, newInvitee2.groupId);
            
            res = await groupModel.getGroupInvitees(id);
            expect(res).toHaveLength(1);
            expect(res[1]).not.toBeDefined();

        });

    });

});