const request = require('supertest');

const server = require('../server');

describe('teamRouter', () => {

    it('should set testing environment', () => {
        expect(process.env.DB_ENV).toBe('testing');
    });

    let res;

    beforeEach(async () => {
        return res = await request(server).get('/api/team/')
    })

    describe('GET /', () => {

        it('should return 200 OK with JSON resp', async () => {
            expect(res.status).toBe(200);
            expect(res.type).toBe('application/json');
        })

        it('should return list of team members', () => {
            expect(res.body).toHaveLength(6);
            expect(res.body[1].id).toBe(2);
            expect(res.body[1].name).toBe("Chelsea Tolnai")
            expect(res.body[1].displayName).toBe("Chealsea")
        })

    });

});

