const userModel = require('./userInvitedModel.js');
const { dbReset, group1, newMember1 } = require('../../serverTestReset.js');

describe('userInvitedModel', () => {

    let res;
    const id = 1;

    beforeEach(async () => {
        await dbReset();
    })

    describe('getGroups()', () => {

        it('should return list all groups specified user is invited to', async () => {
            res = await userModel.getGroups(id);
            expect(res).toHaveLength(1);
            expect(res[0].groupId).toBe(newMember1.groupId);
            expect(res[0].GroupName).toBe(group1.name);
        });

    });

});