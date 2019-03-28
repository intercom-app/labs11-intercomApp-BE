const groupModel = require('./groupActivitiesModel.js');
const db = require('../../../data/dbConfig.js');
const { dbReset, activity1, user1 } = require('../../serverTestReset.js');

describe('groupActivitiesModel', () => {

    let res;

    beforeEach(async () => {
        await dbReset();
    })

    describe('getGroupActivity()', () => {

        it('should return list all activities by specified group ID', async () => {
            res = await groupModel.getGroupActivity(1);
            expect(res).toHaveLength;
            expect(res[0].activity).toBe(activity1.activity);
            expect(res[0].displayName).toBe(user1.displayName);
            expect(res[0].createdAt).toBeDefined();

        });

    });

    describe('addGroupActivity()', () => {

        it('should add new activity and return update activities', async () => {
            await db('activities').truncate();
            res = await groupModel.addGroupActivity(activity1);
            expect(res).toHaveLength(1);
            expect(res[0].activity).toBe(activity1.activity);
            expect(res[0].displayName).toBe(user1.displayName);
            expect(res[0].createdAt).toBeDefined();

        });

    });

});