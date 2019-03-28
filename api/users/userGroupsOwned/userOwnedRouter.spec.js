const request = require('supertest');

const server = require('../../server.js');
const { dbReset, group1, newMember1 } = require('../../serverTestReset.js');

describe('uesrOwnedRouter', () => {

    it('should set testing environment', () => {
        expect(process.env.DB_ENV).toBe('testing');
    });

    let res;
    const id = 1;

    beforeEach(async () => {
        await dbReset();
    })

    describe('GET/ ', () => {
        
        beforeEach(async () => {
            return res = await request(server).get(`/api/users/${id}/groupsOwned`)
        })

        it('should return 200 OK with JSON resp', async () => {
            expect(res.status).toBe(200);
            expect(res.type).toBe('application/json');
        })

        it('should return list of groups user belongs to with group id and name', () => {
            expect(res.body).toBeDefined();
            expect(res.body).toHaveLength(1);
            expect(res.body[0].groupId).toBe(newMember1.groupId);
            expect(res.body[0].GroupName).toBe(group1.name);
        })

    });

});

