const request = require('supertest');

const server = require('../../server');

describe('groupActivitiesRouter', () => {

    it('should set testing environment', () => {
        expect(process.env.DB_ENV).toBe('testing');
    });

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
            expect(res.body[0].groupId).toBe(id);
            expect(res.body[0].userId).toBeDefined();
            expect(res.body[0].activity).toBeDefined();

        })

    });

});

