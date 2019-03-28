const request = require('supertest');

const server = require('../../server');
const { dbReset, user1, user2, newInvitee1, newInvitee2 } = require('../../serverTestReset.js');

describe('groupInviteesRouter', () => {

    it('should set testing environment', () => {
        expect(process.env.DB_ENV).toBe('testing');
    });

    let res;
    const id = 1;

    beforeEach(async () => {
        await dbReset();
    })

    describe('GET /:id/groupInvitees', () => {
        
        beforeEach(async () => {
            return res = await request(server).get(`/api/groups/${id}/groupInvitees`)
        })

        it('should return 200 OK with JSON resp', async () => {
            expect(res.status).toBe(200);
            expect(res.type).toBe('application/json');
        })

        it('should return list of groupInvitees displayNames with user and group id', () => {
            expect(res.body).toBeDefined();
            expect(res.body).toHaveLength(1);
            expect(res.body[0].groupId).toBe(id);
            expect(res.body[0].userId).toBe(newInvitee1.userId);
            expect(res.body[0].displayName).toBe(user1.displayName);

        })

    });

    describe('POST /:id/groupInvitees', () => {

        beforeEach( async () => {
            return res = await request(server).post(`/api/groups/${id}/groupInvitees`).send(newInvitee2);
        })

        it('should return 201 OK with JSON resp', () => {
            expect(res.status).toBe(201);
            expect(res.type).toBe('application/json');
        })

        it('should return updated group with new owners', () => {
            expect(res.body).toHaveLength(2);
            expect(res.body[1].groupId).toBe(id);
            expect(res.body[1].userId).toBe(newInvitee2.userId);
            expect(res.body[1].displayName).toBe(user2.displayName);

        })

    });

    describe('DELETE /:id/groupInvitees/:id', () => {
        
        beforeEach( async () => {
            await request(server).post(`/api/groups/${id}/groupInvitees`).send(newInvitee2);
            return res = await request(server).delete(`/api/groups/${id}/groupInvitees/${newInvitee2.userId}`)
        })

        it('should return 200 OK with correct JSON resp', async () => {
            expect(res.status).toBe(200);
            expect(res.type).toBe('application/json');
        })

        it('return updated group without deleted invitee', async () => {
            expect(res.body).toHaveLength(1);
            expect(res.body[1]).not.toBeDefined();
        })

    });

});

