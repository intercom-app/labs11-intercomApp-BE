const groupModel = require('./groupMembersModel.js');
const db = require('../../../data/dbConfig.js');
const { dbReset, user1, user2, newMember1, newMember2 } = require('../../serverTestReset.js');

describe('groupMembersModel', () => {

    let res;
    const id = 1;

    beforeEach(async () => {
        await dbReset();
    })

    describe('getGroupMembers()', () => {

        it('should return list all members of group by specified group ID', async () => {
            res = await groupModel.getGroupMembers(id);
            expect(res).toHaveLength(1);
            expect(res[0].groupId).toBe(newMember1.groupId);
            expect(res[0].userId).toBe(newMember1.userId);
            expect(res[0].displayName).toBe(user1.displayName);

        });

    });

    describe('addGroupMember()', () => {

        it('should add new member to group', async () => {
            res = await groupModel.addGroupMember(newMember2);
            expect(res).toHaveLength(2);
            expect(res[1].groupId).toBe(newMember2.groupId);
            expect(res[1].userId).toBe(newMember2.userId);
            expect(res[1].displayName).toBe(user2.displayName);

        });

    });

    describe('deleteGroupMember()', () => {

        it('should delete the group member by sepcified id and return updated group', async () => {
            await db('usersGroupsMembership').insert(newMember2);

            const resInit = await groupModel.getGroupMembers(id);
            expect(resInit).toHaveLength(2);
            expect(resInit[1].groupId).toBe(newMember2.groupId);
            expect(resInit[1].userId).toBe(newMember2.userId);
            expect(resInit[1].displayName).toBe(user2.displayName);

            await groupModel.deleteGroupMember(newMember2.userId, newMember2.groupId);
            
            res = await groupModel.getGroupMembers(id);
            expect(res).toHaveLength(1);
            expect(res[1]).not.toBeDefined();

        });

    });

});