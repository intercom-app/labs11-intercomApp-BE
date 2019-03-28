const usersModel = require('./usersModel.js');

const db = require('../../data/dbConfig.js');

describe('usersModel', () => {

    const user1 = {
        firstName: 'Chelsea',
        lastName: 'Tolnai',
        displayName: 'CATolnai',
        email: 'example@test.com'
    };

    let id;

    beforeEach(async () => {
        await db('users').truncate();
        [id] = await db('users').insert(user1);
        return id;
    })

    describe('getUsers()', () => {

        it('should return all users with required db schema', async () => {
            const res = await usersModel.getUsers();
            expect(res).toHaveLength;
            expect(res[0].id).toBe(id);
            expect(res[0].firstName).toBe(user1.firstName);
            expect(res[0].lastName).toBe(user1.lastName);
            expect(res[0].displayName).toBe(user1.displayName);            
            expect(res[0].email).toBe(user1.email);
            expect(res[0].phoneNumber).toBe(null);
            expect(res[0].callStatus).toBe(0);
            expect(res[0].billingSubcription).toBe("free");
            expect(res[0].createdAt).toBeDefined();
        });

    });

    describe('getUserById()', () => {

        it('should return user by specfied ID', async () => {
            const res = await usersModel.getUserById(id);
            expect(res.id).toBe(id);
            expect(res.displayName).toBe(user1.displayName);            
            expect(res.email).toBe(user1.email);
        });

    });

    describe('getUserByEmail()', () => {

        it('should return user by specfied email', async () => {
            const email = user1.email;
            const res = await usersModel.getUserByEmail(email);
            expect(res.id).toBe(id);
            expect(res.displayName).toBe(user1.displayName);            
            expect(res.email).toBe(user1.email);
        });
    });

    describe('addUser()', () => {

        beforeEach(async () => {
            await db('users').truncate();
        })

        it('should return added user', async () => {
            const res = await usersModel.addUser(user1);
            expect(res.id).toBe(id);
            expect(res.firstName).toBe(user1.firstName);
            expect(res.lastName).toBe(user1.lastName);
            expect(res.displayName).toBe(user1.displayName);            
            expect(res.email).toBe(user1.email);
            expect(res.phoneNumber).toBe(null);
            expect(res.callStatus).toBe(0);
            expect(res.billingSubcription).toBe("free");
            expect(res.createdAt).toBeDefined();
        });
    });

});