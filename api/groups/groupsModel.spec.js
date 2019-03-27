const groupModel = require('./groupsModel.js');

describe('groupModel', () => {

    const id = 1

    describe('getAllGroups()', () => {

        it('should return list of all groups with rquired db schema', async () => {
            const res = await groupModel.getAllGroups();
            expect(res).toHaveLength(20);
            expect(res[0].id).toBe(1);
            expect(res[0].name).toBeDefined();
            expect(res[0].phoneNumber).toBeDefined();
            expect(res[0].callStatus).toBeDefined();
            expect(res[0].createdAt).toBeDefined();

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