const usersModel = require('./usersModel.js');
const db = require('../../data/dbConfig.js');
const { dbReset, user1 } = require('../serverTestReset');

describe('usersModel', () => {

    let res;
    const id = 1;

    beforeEach(async () => {
        await dbReset();
    })

    describe('getUsers()', () => {

        it('should return all users with required db schema', async () => {
            res = await usersModel.getUsers();
            expect(res).toHaveLength(2);
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
            res = await usersModel.getUserById(id);
            expect(res.id).toBe(id);
            expect(res.firstName).toBe(user1.firstName);
            expect(res.lastName).toBe(user1.lastName);
            expect(res.displayName).toBe(user1.displayName);            
            expect(res.email).toBe(user1.email);
        });

    });

    describe('getUserByEmail()', () => {

        it('should return user by specfied email', async () => {
            const email = user1.email;
            res = await usersModel.getUserByEmail(email);
            expect(res.id).toBe(id);
            expect(res.firstName).toBe(user1.firstName);
            expect(res.lastName).toBe(user1.lastName);
            expect(res.displayName).toBe(user1.displayName);            
            expect(res.email).toBe(user1.email);
        });
    });

    describe('addUser()', () => {

        it('should return added user', async () => {
            await db('users').truncate();
            res = await usersModel.addUser(user1);
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

    describe('updateUser()', () => {

        it('should update the user by sepcified id', async () => {
            const changes = {
                displayName: 'Chelsea Tolnai',
                phoneNumber: 5555555555,
                billingSubcription: 'premium'
            };

            await usersModel.updateUser(id, changes);
            
            res = await db('users').where({ id }).first();
            expect(res.id).toBe(id);
            expect(res.firstName).toBe(user1.firstName);
            expect(res.lastName).toBe(user1.lastName);
            expect(res.displayName).toBe(changes.displayName);            
            expect(res.email).toBe(user1.email);
            expect(res.phoneNumber).toBe(changes.phoneNumber);
            expect(res.callStatus).toBe(0);
            expect(res.billingSubcription).toBe(changes.billingSubcription);
            expect(res.createdAt).toBeDefined();

        });

    });

    describe('deleteUser()', () => {

        it('should delete the group by sepcified id', async () => {
            let users = await db('users');
            expect(users).toHaveLength(2);
            let user = await db('users').where({ id }).first();
            expect(user).toBeDefined();

            res = await usersModel.deleteUser(id);
            expect(res).toBe(1);

            users = await db('users');
            expect(users).toHaveLength(1);
            user = await db('users').where({ id }).first();
            expect(user).not.toBeDefined();

        });

    });

});