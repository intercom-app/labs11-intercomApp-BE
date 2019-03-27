const groupModel = require('./groupCallStatusModel.js');

describe('groupCallStatusModel', () => {

    const id = 1

    describe('getGroupCallStatus()', () => {

        it('should return call status by specified group ID', async () => {
            const res = await groupModel.getGroupCallStatus(id);
            expect(res.callStatus).toBeDefined();
            expect(res.callStatus === 0 || res.callStatus === 1).toBeTruthy();

        });

    });

});