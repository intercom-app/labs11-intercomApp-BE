const groupModel = require('./groupOwnersModel.js');

describe('groupCallStatusModel', () => {

    const id = 1

    describe('getGroupOwners()', () => {

        it('should return list all owners of group by specified group ID', async () => {
            const res = await groupModel.getGroupOwners(id);
            expect(res).toHaveLength;
            expect(res[0].groupId).toBe(id);
            expect(res[0].userId).toBeDefined();
            expect(res[0].displayName).toBeDefined();

        });

    });

});