const request = require('supertest');

const server = require('../../server');

const db = require('../../../data/dbConfig');

describe('groupActivitiesRouter', () => {

    it('should set testing environment', () => {
        expect(process.env.DB_ENV).toBe('testing');
    });

    const activity1 = {
        groupId: 1,
        userId: 1,
        activity: 'group created'
    };

    let res;
    const id = 1;

    describe('GET /:id/activities', () => {
        
        beforeEach(async () => {
            return res = await request(server).get(`/api/groups/${id}/activities`)
        })

        it('should return 200 OK with JSON resp', async () => {
            expect(res.status).toBe(200);
            expect(res.type).toBe('application/json');
        })

        it('should return list of acivities', () => {
            expect(res.body).toBeDefined();
            expect(res.body).toHaveLength;
            expect(res.body[0].activity).toBeDefined();
            expect(res.body[0].displayName).toBeDefined();
            expect(res.body[0].createdAt).toBeDefined();

        })

    });

    describe('POST /:id/activities', () => {

        beforeEach( async () => {
            await db('activities').truncate();
            return res = await request(server).post(`/api/groups/${id}/activities`).send(activity1);
        })

        it('should return 201 OK with JSON resp', () => {
            expect(res.status).toBe(201);
            expect(res.type).toBe('application/json');
        })

        it('should return updated activities with new activity', () => {
            expect(res.body).toHaveLength(1);
            expect(res.body[0].activity).toBe(activity1.activity);
            expect(res.body[0].displayName).toBeDefined();
            expect(res.body[0].createdAt).toBeDefined();

        })

    });

});

