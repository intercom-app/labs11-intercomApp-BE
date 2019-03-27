const groupModel = require('./groupActivitiesModel.js');

describe('groupActivitiesModel', () => {

    const id = 1

    describe('getGroupActivity()', () => {

        it('should return list all activities by specified group ID', async () => {
            const res = await groupModel.getGroupActivity(id);
            expect(res).toHaveLength;
            expect(res[0].groupId).toBe(id);
            expect(res[0].userId).toBeDefined();
            expect(res[0].activity).toBeDefined();

        });

    });

});