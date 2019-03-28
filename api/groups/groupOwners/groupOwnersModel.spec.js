const groupModel = require('./groupOwnersModel.js');
const db = require('../../../data/dbConfig.js');
const { dbReset, user1, user2, newOwner1, newOwner2 } = require('../../serverTestReset.js');

describe('groupOwnersModel', () => {

    let res;
    const id = 1;

    beforeEach(async () => {
        await dbReset();
    })

    describe('getGroupOwners()', () => {

        it('should return list all owners of group by specified group ID', async () => {
            res = await groupModel.getGroupOwners(id);
            expect(res).toHaveLength(1);
            expect(res[0].groupId).toBe(newOwner1.groupId);
            expect(res[0].userId).toBe(newOwner1.userId);
            expect(res[0].displayName).toBe(user1.displayName);

        });

    });

    describe('addGroupOwner()', () => {

        it('should add new owner to group', async () => {
            res = await groupModel.addGroupOwner(newOwner2);
            expect(res).toHaveLength(2);
            expect(res[1].groupId).toBe(newOwner2.groupId);
            expect(res[1].userId).toBe(newOwner2.userId);
            expect(res[1].displayName).toBe(user2.displayName);

        });

    });

    describe('deleteGroupOwner()', () => {

        it('should delete the group owner by sepcified id and return updated group', async () => {
            await db('usersGroupsOwnership').insert(newOwner2);

            const resInit = await groupModel.getGroupOwners(id);
            expect(resInit).toHaveLength(2);
            expect(resInit[1].groupId).toBe(newOwner2.groupId);
            expect(resInit[1].userId).toBe(newOwner2.userId);
            expect(resInit[1].displayName).toBe(user2.displayName);

            await groupModel.deleteGroupOwner(newOwner2.userId, newOwner2.groupId);
            
            res = await groupModel.getGroupOwners(id);
            expect(res).toHaveLength(1);
            expect(res[1]).not.toBeDefined();

        });

    });

});