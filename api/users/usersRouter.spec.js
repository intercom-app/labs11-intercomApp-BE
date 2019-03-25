const request = require('supertest');

const server = require('../server');

describe('usersRouter', () => {

    it('should set testing environment', () => {
        expect(process.env.DB_ENV).toBe('testing');
    });

    let res;

    

    describe('GET /', () => {

        beforeEach(async () => {
            return res = await request(server).get('/api/users/')
        })

        it('should return 200 OK with JSON resp', async () => {
            expect(res.status).toBe(200);
            expect(res.type).toBe('application/json');
        })

        it('should return list of users', () => {
            expect(res.body).toHaveLength(63);
            expect(res.body[1].id).toBe(2);
            expect(res.body[1].firstName).toBe("Janine")
            expect(res.body[8].displayName).toBe("Konstance")
        })

    });

    describe('GET /:id', () => {

        beforeEach(async () => {
            return res = await request(server).get('/api/users/1')
        })

        it('should return 200 OK with JSON resp', async () => {
            expect(res.status).toBe(200);
            expect(res.type).toBe('application/json');
        })

        it('should return the requested user', () => {
            expect(res.body.id).toBe(1);
            expect(res.body.firstName).toBe("Jerrylee")
            expect(res.body.displayName).toBe("Pepi")
            expect(res.body.billingSubcription).toBeDefined()
            
        })


    })


});

