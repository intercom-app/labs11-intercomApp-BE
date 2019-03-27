const request = require('supertest');

const server = require('../../server');

const db = require('../../../data/dbConfig');

describe('groupCallStatusRouter', () => {

    it('should set testing environment', () => {
        expect(process.env.DB_ENV).toBe('testing');
    });

    const group1 = {
        name: 'Group1',
    };

    let id, res;

    beforeEach(async () => {
        await db('groups').truncate();
        [id] = await db('groups').insert(group1);
        return id;
    })

    describe('GET /:id/callStatus', () => {
        
        beforeEach(async () => {
            return res = await request(server).get(`/api/groups/${id}/callStatus`)
        })

        it('should return 200 OK with JSON resp', async () => {
            expect(res.status).toBe(200);
            expect(res.type).toBe('application/json');
        })

        it('should return call status of group', () => {
            expect(res.body.callStatus).toBeDefined();
            expect(res.body.callStatus).toBe(0);

        })

    });

    describe('PUT /:id/callStatus', () => {

        const changes = {
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
            expect(res.body.callStatus).toBe(1);
        })

    });

});

