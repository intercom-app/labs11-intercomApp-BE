const groupModel = require('./groupOwnersModel.js');

const db = require('../../../data/dbConfig.js');

describe('groupOwnersModel', () => {

    const group1 = {
        name: 'Group1',
    };

    const user1 = {
        firstName: 'Chelsea',
        lastName: 'Tolnai',
        displayName: 'CATolnai',
        email: 'example@test.com'
    };

    const user2 = {
        firstName: 'Erinc',
        lastName: 'Emer',
        displayName: 'EEmer',
        email: 'EEmer@test.com'
    };

    const newOwner1 = {
        userId: 1,
        groupId: 1
    };

    const newOwner2 = {
        userId: 2,
        groupId: 1
    };

    beforeEach(async () => {
        await db('groups').truncate();
        await db('groups').insert(group1);

        await db('users').truncate();
        await db('users').insert(user1);
        await db('users').insert(user2);

        await db('usersGroupsOwnership').truncate();
    })

    describe('getGroupOwners()', () => {

        it('should return list all owners of group by specified group ID', async () => {
            await db('usersGroupsOwnership').insert(newOwner1);

            const res = await groupModel.getGroupOwners(1);
            expect(res).toHaveLength;
            expect(res[0].groupId).toBe(1);
            expect(res[0].userId).toBeDefined();
            expect(res[0].displayName).toBeDefined();

        });

    });

    describe('addGroupOwner()', () => {

        it('should add new owner to group', async () => {
            const resInit = await groupModel.getGroupOwners(1);
            expect(resInit).not.toHaveLength;

            const resFinal = await groupModel.addGroupOwner(newOwner1);

            expect(resFinal).toHaveLength;
            expect(resFinal[0].groupId).toBe(newOwner1.groupId);
            expect(resFinal[0].userId).toBe(newOwner1.userId);
            expect(resFinal[0].displayName).toBeDefined();

        });

    });

    describe('deleteGroupOwner()', () => {

        it('should delete the group owner by sepcified id and return updated group', async () => {
            await db('usersGroupsOwnership').insert(newOwner1);
            await db('usersGroupsOwnership').insert(newOwner2);

            const resInit = await groupModel.getGroupOwners(1);
            expect(resInit).toHaveLength(2);
            expect(resInit[1].groupId).toBe(newOwner2.groupId);
            expect(resInit[1].userId).toBe(newOwner2.userId);
            expect(resInit[1].displayName).toBeDefined();

            await groupModel.deleteGroupOwner(newOwner2.userId, newOwner2.groupId);
            
            const resFinal = await groupModel.getGroupOwners(1);
            expect(resFinal).toHaveLength(1);
            expect(resFinal[1]).not.toBeDefined();

        });

    });

});