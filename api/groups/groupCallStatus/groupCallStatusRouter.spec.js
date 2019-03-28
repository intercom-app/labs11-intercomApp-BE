const request = require('supertest');

const server = require('../../server');
const { dbReset } = require('../../serverTestReset.js');

describe('groupCallStatusRouter', () => {

    it('should set testing environment', () => {
        expect(process.env.DB_ENV).toBe('testing');
    });

    let res;
    const id = 1;

    beforeEach(async () => {
        await dbReset();
    })

    describe('GET /:id/callStatus', () => {

        it('should return 200 OK with JSON resp with call status of group', async () => {
            res = await request(server).get(`/api/groups/${id}/callStatus`)
            expect(res.status).toBe(200);
            expect(res.type).toBe('application/json');
            expect(res.body.callStatus).toBe(0);
        })

    });

    describe('PUT /:id/callStatus', () => {

        const changes = {
            callStatus: true,
        };

        it('should return 200 OK with JSON resp with updated callStatus', async () => {
            res = await request(server).put(`/api/groups/${id}`).send(changes)
            expect(res.status).toBe(200);
            expect(res.type).toBe('application/json');
            expect(res.body.callStatus).toBe(1);
        })

    });

});

