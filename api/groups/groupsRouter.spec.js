const request = require('supertest');

const server = require('../server');

describe('groupsRouter', () => {

    it('should set testing environment', () => {
        expect(process.env.DB_ENV).toBe('testing');
    });

    let res;
    const id = 1;

    describe('GET /', () => {

        beforeEach(async () => {
            return res = await request(server).get('/api/groups/')
        })

        it('should return 200 OK with JSON resp', async () => {
            expect(res.status).toBe(200);
            expect(res.type).toBe('application/json');
        })

        it('should return list of groups with rquired db schema', () => {
            expect(res.body).toHaveLength(20);
            expect(res.body[0].id).toBe(1);
            expect(res.body[0].name).toBeDefined();
            expect(res.body[0].phoneNumber).toBeDefined();
            expect(res.body[0].callStatus).toBeDefined();
            expect(res.body[0].createdAt).toBeDefined();
        })

    });

    describe('GET /:id', () => {
    
        beforeEach(async () => {
            return res = await request(server).get(`/api/groups/${id}`)
        })

        it('should return 200 OK with JSON resp', async () => {
            expect(res.status).toBe(200);
            expect(res.type).toBe('application/json');
        })

        it('should return one group with specified ID by params', () => {
            expect(res.body).toBeDefined();
            expect(res.body.id).toBe(id);
            expect(res.body.name).toBeDefined();
            expect(res.body.phoneNumber).toBeDefined();
            expect(res.body.callStatus).toBeDefined();
            expect(res.body.createdAt).toBeDefined();
        })

    });

    describe('GET /:id/groupMembers', () => {
        
        beforeEach(async () => {
            return res = await request(server).get(`/api/groups/${id}/groupMembers`)
        })

        it('should return 200 OK with JSON resp', async () => {
            expect(res.status).toBe(200);
            expect(res.type).toBe('application/json');
        })

        it('should return list of groupMembers display Names with user and group id', () => {
            expect(res.body).toBeDefined();
            expect(res.body).toHaveLength;
            expect(res.body[0].groupId).toBe(id);
            expect(res.body[0].userId).toBeDefined();
            expect(res.body[0].displayName).toBeDefined();

        })

    });

});

