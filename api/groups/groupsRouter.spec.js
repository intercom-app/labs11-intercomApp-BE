const request = require('supertest');

const server = require('../server');
const db = require('../../data/dbConfig');

const { dbReset, group1 } = require('../serverTestReset');

describe('groupsRouter', () => {

    it('should set testing environment', () => {
        expect(process.env.DB_ENV).toBe('testing');
    });

    let res;
    const id = 1;

    beforeEach( async () => {
        await dbReset();
    })

    describe('GET /', () => {

        beforeEach(async () => {
            return res = await request(server).get('/api/groups/')
        })

        it('should return 200 OK with JSON resp', async () => {
            expect(res.status).toBe(200);
            expect(res.type).toBe('application/json');
        })

        it('should return list of groups with rquired db schema', () => {
            expect(res.body).toHaveLength;
            expect(res.body[0].id).toBe(1);
            expect(res.body[0].name).toBe(group1.name);
            expect(res.body[0].phoneNumber).toBe(null);
            expect(res.body[0].callStatus).toBe(0);
            expect(res.body[0].createdAt).toBeDefined();
        })

    });

    describe('POST /', () => {

        beforeEach( async () => {
            await db('groups').truncate();
            return res = await request(server).post('/api/groups').send(group1);
        })

        it('should return 201 OK with JSON resp', () => {
            expect(res.status).toBe(201);
            expect(res.type).toBe('application/json');
        })

        it('should return inserted group', () => {
            expect(res.body.id).toBe(1);
            expect(res.body.name).toBe(group1.name);
            expect(res.body.phoneNumber).toBe(null);
            expect(res.body.callStatus).toBe(0);
            expect(res.body.createdAt).toBeDefined();
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
            expect(res.body.name).toBe(group1.name);
            expect(res.body.phoneNumber).toBe(null);
            expect(res.body.callStatus).toBe(0);
            expect(res.body.createdAt).toBeDefined();
        })

    });

    describe('PUT /:id', () => {

        const changes = {
            name: 'GroupOne',
            phoneNumber: 5555555555,
            callStatus: true,
        };

        beforeEach( async () => {
            return res = await request(server).put(`/api/groups/${id}`).send(changes)
        })

        it('should return 200 OK with JSON resp', async () => {
            expect(res.status).toBe(200);
            expect(res.type).toBe('application/json');
        })

        it('should update group and return group', async () => {
            expect(res.body.id).toBe(1);
            expect(res.body.name).toBe(changes.name);
            expect(res.body.phoneNumber).toBe(changes.phoneNumber);
            expect(res.body.callStatus).toBe(1);
            expect(res.body.createdAt).toBeDefined();

            const origGroup = await db('groups').where({ name: group1.name }).first();
            expect(origGroup).not.toBeDefined();

            const updatedGroup = await db('groups').where({ name: changes.name }).first();
            expect(updatedGroup).toBeDefined();
        })

    });

    describe('DELETE /:id', () => {
        
        beforeEach( async () => {
            return res = await request(server).delete(`/api/groups/${id}`)
        })

        it('should return 200 OK with correct JSON resp', async () => {
            expect(res.status).toBe(200);
            expect(res.type).toBe('application/json');
            expect(res.body).toEqual({ count: '1 group deleted' });
        })

        it('confirms user deleted from db', async () => {
            const origGroup = await db('groups').where({ name: group1.name }).first();
            expect(origGroup).not.toBeDefined();
            
            const dbGroups = await db('groups');
            expect(dbGroups).toHaveLength(1);    
        })

    });

});

