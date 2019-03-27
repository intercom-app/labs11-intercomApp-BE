const groupModel = require('./groupMembersModel.js');

const db = require('../../../data/dbConfig.js');

describe('groupMembersModel', () => {
        
    const group1 = {
        name: 'Group1',
    };

    const newMember1 = {
        userId: 1,
        groupId: 1
    };

    const newMember2 = {
        userId: 2,
        groupId: 1
    };

    beforeEach(async () => {
        await db('groups').truncate();
        await db('groups').insert(group1);
        await db('usersGroupsMembership').truncate();
    })

    describe('getGroupMembers()', () => {

        it('should return list all members of group by specified group ID', async () => {
            await db('usersGroupsMembership').insert(newMember1);

            const res = await groupModel.getGroupMembers(1);
            expect(res).toHaveLength;
            expect(res[0].groupId).toBe(newMember1.groupId);
            expect(res[0].userId).toBe(newMember1.userId);
            expect(res[0].displayName).toBeDefined();

        });

    });

    describe('addGroup()', () => {

        it('should add new member to group', async () => {
            const resInit = await groupModel.getGroupMembers(1);
            expect(resInit).not.toHaveLength;

            const resFinal = await groupModel.addGroupMember(newMember1);

            expect(resFinal).toHaveLength;
            expect(resFinal[0].groupId).toBe(newMember1.groupId);
            expect(resFinal[0].userId).toBe(newMember1.userId);
            expect(resFinal[0].displayName).toBeDefined();

        });

    });

    describe('deleteGroup()', () => {

        it('should delete the group by sepcified id', async () => {
            await db('usersGroupsMembership').insert(newMember1);
            await db('usersGroupsMembership').insert(newMember2);

            const resInit = await groupModel.getGroupMembers(1);
            expect(resInit).toHaveLength(2);
            expect(resInit[1].groupId).toBe(newMember2.groupId);
            expect(resInit[1].userId).toBe(newMember2.userId);
            expect(resInit[1].displayName).toBeDefined();

            await groupModel.deleteGroupMember(newMember2.userId, newMember2.groupId);
            
            const resFinal = await groupModel.getGroupMembers(1);
            expect(resFinal).toHaveLength(1);
            expect(resFinal[1]).not.toBeDefined();

        });

    });

});