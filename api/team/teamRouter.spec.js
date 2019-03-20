const request = require('supertest');

const server = require('../../index.js');

describe('teamRouter', () => {

    let res;

    beforeEach(async () => {
        return res = await request(server).get('/api/team')
    })

    describe('GET /', () => {

        it('should return 200 OK with JSON resp', async () => {
            expect(res.status).toBe(200);
            expect(res.type).toBe('application/json');
        })

        it('should return list of team members', () => {
            expect(res.body).toBeDefined();
        })

    });

});

