const request = require('supertest');

const server = require('../../server');

describe('groupActivitiesRouter', () => {

    it('should set testing environment', () => {
        expect(process.env.DB_ENV).toBe('testing');
    });

    let res;
    const id = 1;

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
            expect(res.body.callStatus === 0 || res.body.callStatus === 1).toBeTruthy();

        })

    });

});

