const groupModel = require('./groupCallStatusModel.js');

const db = require('../../../data/dbConfig.js');

describe('groupCallStatusModel', () => {

    const group1 = {
        name: 'Group1',
    };

    let id;

    beforeEach(async () => {
        await db('groups').truncate();
        [id] = await db('groups').insert(group1);
        return id;
    })

    describe('getGroupCallStatus()', () => {

        it('should return call status by specified group ID', async () => {
            const res = await groupModel.getGroupCallStatus(id);
            expect(res.callStatus).toBeDefined();
            expect(res.callStatus).toBe(0);

        });

    });

    describe('updateCallStatus()', () => {

        it('should update the group call status by sepcified id', async () => {
            let statusInit = await groupModel.getGroupCallStatus(id);
            expect(statusInit.callStatus).toBe(0);

            const changes = {
                callStatus: true,
            };

            await groupModel.updateCallStatus(id, changes);
            
            const statusFinal = await db('groups').where({ id }).first();
            expect(statusFinal.callStatus).toBe(1);

        });

    });

});