const groupModel = require('./groupActivitiesModel.js');

const db = require('../../../data/dbConfig.js');

describe('groupActivitiesModel', () => {
    
    const group1 = {
        name: 'Group1',
    };

    const activity1 = {
        groupId: 1,
        userId: 1,
        activity: 'group created'
    }
    const activity2 = {
        groupId: 1,
        userId: 2,
        activity: 'joined group'
    }

    beforeEach(async () => {
        await db('groups').truncate();
        await db('groups').insert(group1);
    })

    describe('getGroupActivity()', () => {

        it('should return list all activities by specified group ID', async () => {
            await db('activities').truncate();
            await db('activities').insert(activity1);
            await db('activities').insert(activity2);

            const res = await groupModel.getGroupActivity(1);
            expect(res).toHaveLength(2);
            expect(res[0].activity).toBe(activity1.activity);
            expect(res[0].displayName).toBeDefined();
            expect(res[0].createdAt).toBeDefined();

        });

    });

    describe('addGroup()', () => {


        it('should add new activity to db', async () => {
            await db('activities').truncate();

            const newActivity1 = await groupModel.addGroupActivity(activity1);
            expect(newActivity1.id).toBe(1);
            expect(newActivity1.groupId).toBe(activity1.groupId);
            expect(newActivity1.userId).toBe(activity1.userId);
            expect(newActivity1.activity).toBe(activity1.activity);
            expect(newActivity1.createdAt).toBeDefined();

        });

    });

});