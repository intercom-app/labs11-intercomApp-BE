const groupModel = require('./groupMembersModel.js');

describe('groupCallStatusModel', () => {

    const id = 1

    describe('getGroupMembers()', () => {

        it('should return list all members of group by specified group ID', async () => {
            const res = await groupModel.getGroupMembers(id);
            expect(res).toHaveLength;
            expect(res[0].groupId).toBe(id);
            expect(res[0].userId).toBeDefined();
            expect(res[0].displayName).toBeDefined();

        });

    });

});