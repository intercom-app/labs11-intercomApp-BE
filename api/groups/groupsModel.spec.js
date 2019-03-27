const groupModel = require('./groupsModel.js');
const db = require('../../data/dbConfig.js');

describe('groupModel', () => {

    const id = 1

    describe('getAllGroups()', () => {

        it('should return list of all groups with rquired db schema', async () => {
            const res = await groupModel.getAllGroups();
            expect(res).toHaveLength;
            expect(res[0].id).toBe(1);
            expect(res[0].name).toBeDefined();
            expect(res[0].phoneNumber).toBeDefined();
            expect(res[0].callStatus).toBeDefined();
            expect(res[0].createdAt).toBeDefined();

        });

    });

    describe('addGroup()', () => {

        const group1 = {
            name: 'Group1',
        }

        beforeEach(async () => {
            await db('groups').truncate()
        })

        it('should add new group to db', async () => {

            const newGroup1 = await groupModel.addGroup(group1);
            expect(newGroup1.id).toBe(1);
            expect(newGroup1.name).toBe(group1.name);
            expect(newGroup1.phoneNumber).toBe(null);
            expect(newGroup1.callStatus).toBe(0);
            expect(newGroup1.createdAt).toBeDefined();

        });

    });

    describe('getGroupByID()', () => {

        it('should return list of one group by specified ID', async () => {
            const res = await groupModel.getGroupByID(id);
            expect(res).toBeDefined();
            expect(res.id).toBe(id);
            expect(res.name).toBeDefined();
            expect(res.phoneNumber).toBeDefined();
            expect(res.callStatus).toBeDefined();
            expect(res.createdAt).toBeDefined();

        });

    });

});