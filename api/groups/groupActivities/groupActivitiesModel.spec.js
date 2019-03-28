const groupModel = require('./groupActivitiesModel.js');

const db = require('../../../data/dbConfig.js');

describe('groupActivitiesModel', () => {
    
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

    const activity1 = {
        groupId: 1,
        userId: 1,
        activity: 'group created'
    };

    const activity2 = {
        groupId: 1,
        userId: 2,
        activity: 'joined group'
    };

    beforeEach(async () => {
        await db('groups').truncate();
        await db('groups').insert(group1);
        
        await db('users').truncate();
        await db('users').insert(user1);
        await db('users').insert(user2);
        
        await db('activities').truncate();
    })

    describe('getGroupActivity()', () => {

        it('should return list all activities by specified group ID', async () => {
            await db('activities').insert(activity1);
            await db('activities').insert(activity2);

            const res = await groupModel.getGroupActivity(1);
            expect(res).toHaveLength(2);
            expect(res[0].activity).toBe(activity1.activity);
            expect(res[0].displayName).toBeDefined();
            expect(res[0].createdAt).toBeDefined();

        });

    });

    describe('addGroupActivity()', () => {

        it('should add new activity and return update activities', async () => {
            const res = await groupModel.addGroupActivity(activity1);
            expect(res).toHaveLength(1);
            expect(res[0].activity).toBe(activity1.activity);
            expect(res[0].displayName).toBeDefined();
            expect(res[0].createdAt).toBeDefined();

        });

    });

});