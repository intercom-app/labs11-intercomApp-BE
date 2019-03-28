const groupModel = require('./groupCallStatusModel.js');
const { dbReset } = require('../../serverTestReset.js');

describe('groupCallStatusModel', () => {

    let res;
    const id = 1;

    beforeEach(async () => {
        await dbReset();
    })

    describe('getGroupCallStatus()', () => {

        it('should return call status by specified group ID', async () => {
            res = await groupModel.getGroupCallStatus(id);
            expect(res.callStatus).toBe(0);
        });

    });

    describe('updateCallStatus()', () => {

        it('should update the group call status by sepcified id', async () => {

            const changes = {
                callStatus: true,
            };

            await groupModel.updateCallStatus(id, changes);
            
            res = await groupModel.getGroupCallStatus(id);
            expect(res.callStatus).toBe(1);

        });

    });

});