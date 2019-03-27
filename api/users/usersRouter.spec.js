const request = require('supertest');

const server = require('../server');

const db = require('../../data/dbConfig');

describe('usersRouter', () => {

    it('should set testing environment', () => {
        expect(process.env.DB_ENV).toBe('testing');
    });

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

    const user3 = {
        firstName: 'Stephen',
        lastName: 'Fargali',
        displayName: 'Stefarg',
        email: 'Stefarg@test.com'
    };

    const user1Exists = {
        nickname: 'CATolnai',
        email: 'example@test.com'
    }

    const user2Exists = {
        nickname: 'EEmer',
        email: 'EEmer@test.com'
    };

    const user3NoExists = {
        nickname: 'Stefarg',
        email: 'Stefarg@test.com'
    };

    let res;

    beforeEach(async () => {
        await db('users').truncate();
        await db('users').insert(user1);
        await db('users').insert(user2);
    })

    describe('GET /', () => {

        beforeEach(async () => {
            return res = await request(server).get('/api/users/')
        })

        it('should return 200 OK with JSON resp', async () => {
            expect(res.status).toBe(200);
            expect(res.type).toBe('application/json');
        })

        it('should return list of users', () => {
            expect(res.body).toHaveLength(2);
            expect(res.body[0].id).toBe(1);
            expect(res.body[0].firstName).toBe(user1.firstName);
            expect(res.body[0].lastName).toBe(user1.lastName);
            expect(res.body[0].displayName).toBe(user1.displayName);            
            expect(res.body[0].email).toBe(user1.email);
            expect(res.body[0].phoneNumber).toBe(null);
            expect(res.body[0].callStatus).toBe(0);
            expect(res.body[0].billingSubcription).toBe("free");
            expect(res.body[0].createdAt).toBeDefined();
        })

    });

    describe('POST /', () => {

        it('if user already exists should return 200 OK with JSON resp', async () => {
            const res = await request(server).post('/api/users').send(user1Exists);
            expect(res.status).toBe(200);
            expect(res.type).toBe('application/json');
        })

        it('if user already exists should return existed user', async () => {
            const res = await request(server).post('/api/users').send(user2Exists);
            expect(res.body.id).toBe(2);
            expect(res.body.displayName).toBe(user2.displayName);            
            expect(res.body.email).toBe(user2.email);
        })

        it('if user does not exists should return 201 OK with new user', async () => {
            const res = await request(server).post('/api/users').send(user3NoExists);
            expect(res.status).toBe(201);
            expect(res.type).toBe('application/json');
            expect(res.body.id).toBe(3);
            expect(res.body.displayName).toBe(user3.displayName);            
            expect(res.body.email).toBe(user3.email);
        })

    });

    describe('GET /:id', () => {

        beforeEach(async () => {
            return res = await request(server).get(`/api/users/${1}`)
        })

        it('should return 200 OK with JSON resp', async () => {
            expect(res.status).toBe(200);
            expect(res.type).toBe('application/json');
        })

        it('should return the requested user', () => {
            expect(res.body.id).toBe(1);
            expect(res.body.firstName).toBe(user1.firstName);
            expect(res.body.lastName).toBe(user1.lastName);
            expect(res.body.displayName).toBe(user1.displayName);            
            expect(res.body.email).toBe(user1.email);
            expect(res.body.phoneNumber).toBe(null);
            expect(res.body.callStatus).toBe(0);
            expect(res.body.billingSubcription).toBe("free");
            expect(res.body.createdAt).toBeDefined();
            
        })


    })


});

