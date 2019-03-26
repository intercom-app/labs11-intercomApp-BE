const request = require('supertest');

const server = require('../server');

describe('groupsRouter', () => {

    it('should set testing environment', () => {
        expect(process.env.DB_ENV).toBe('testing');
    });

    let res;

    beforeEach(async () => {
        return res = await request(server).get('/api/groups/')
    })

    describe('GET /', () => {

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

});

