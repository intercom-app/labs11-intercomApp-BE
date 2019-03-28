const groupModel = require('./groupsModel.js');
const db = require('../../data/dbConfig.js');
const { dbReset, group1 } = require('../serverTestReset');

describe('groupModel', () => {

    let res;
    const id = 1;

    beforeEach(async () => {
        await dbReset();
    })

    describe('getAllGroups()', () => {

        it('should return list of all groups with rquired db schema', async () => {
            res = await groupModel.getAllGroups();
            expect(res).toHaveLength(2);
            expect(res[0].id).toBe(id);
            expect(res[0].name).toBeDefined();
            expect(res[0].phoneNumber).toBeDefined();
            expect(res[0].callStatus).toBeDefined();
            expect(res[0].createdAt).toBeDefined();

        });

    });

    describe('addGroup()', () => {

        beforeEach(async () => {
            await db('groups').truncate()
        })

        it('should add new group to db', async () => {

            res = await groupModel.addGroup(group1);
            expect(res.id).toBe(id);
            expect(res.name).toBe(group1.name);
            expect(res.phoneNumber).toBe(null);
            expect(res.callStatus).toBe(0);
            expect(res.createdAt).toBeDefined();

        });

    });

    describe('getGroupByID()', () => {

        it('should return list of one group by specified ID', async () => {
            res = await groupModel.getGroupByID(id);
            expect(res).toBeDefined();
            expect(res.id).toBe(id);
            expect(res.name).toBe(group1.name);
            expect(res.phoneNumber).toBe(null);
            expect(res.callStatus).toBe(0);
            expect(res.createdAt).toBeDefined();

        });

    });

    describe('updateGroup()', () => {

        it('should update the group by sepcified id', async () => {
            let groupInit = await db('groups').where({ id }).first();
            expect(groupInit.id).toBe(id);
            expect(groupInit.name).toBe(group1.name);
            expect(groupInit.phoneNumber).toBe(null);
            expect(groupInit.callStatus).toBe(0);
            expect(groupInit.createdAt).toBeDefined();

            const changes = {
                name: 'GroupOne',
                phoneNumber: 5555555555,
                callStatus: true,
            };

            await groupModel.updateGroup(id, changes);
            
            const groupFinal = await db('groups').where({ id }).first();
            expect(groupFinal.id).toBe(id);
            expect(groupFinal.name).toBe(changes.name);
            expect(groupFinal.phoneNumber).toBe(changes.phoneNumber);
            expect(groupFinal.callStatus).toBe(1);
            expect(groupFinal.createdAt).toBeDefined();
        });

    });

    describe('deleteGroup()', () => {

        it('should delete the group by sepcified id', async () => {
            let groups = await db('groups');
            expect(groups).toHaveLength(2);
            let group = await db('groups').where({ id }).first();
            expect(group).toBeDefined();

            res = await groupModel.deleteGroup(id);
            
            groups = await db('groups');
            expect(groups).toHaveLength(1);
            group = await db('groups').where({ id }).first();
            expect(group).toBeUndefined();

            expect(res).toBe(1);

        });

    });


});