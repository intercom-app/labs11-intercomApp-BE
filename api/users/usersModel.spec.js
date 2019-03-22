const usersModel = require('./usersModel.js');

describe('usersModel', () => {

    describe('getUsers()', () => {

        it('should return all users', async () => {
            const res = await usersModel.getUsers();
            expect(res).toHaveLength(63);
            expect(res[1].id).toBe(2);
            expect(res[0].email).toBe("pmiddup0@apache.org")
            expect(res[5].lastName).toBe("Sizeland")
        });

    });

});