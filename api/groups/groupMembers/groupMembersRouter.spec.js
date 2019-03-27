const request = require('supertest');

const server = require('../../server');

const db = require('../../../data/dbConfig');

describe('groupMembersRouter', () => {

    it('should set testing environment', () => {
        expect(process.env.DB_ENV).toBe('testing');
    });

    const group1 = {
        name: 'Group1',
    };

    const newMember1 = {
        userId: 1,
    };

    const newMember2 = {
        userId: 2,
    };

    let id, res;

    beforeEach(async () => {
        await db('groups').truncate();
        [id] = await db('groups').insert(group1);
        return id;
    })

    describe('GET /:id/groupMembers', () => {
        
        beforeEach(async () => {
            return res = await request(server).get(`/api/groups/${id}/groupMembers`)
        })

        it('should return 200 OK with JSON resp', async () => {
            expect(res.status).toBe(200);
            expect(res.type).toBe('application/json');
        })

        it('should return list of groupMembers displayNames with user and group id', () => {
            expect(res.body).toBeDefined();
            expect(res.body).toHaveLength;
            expect(res.body[0].groupId).toBe(id);
            expect(res.body[0].userId).toBeDefined();
            expect(res.body[0].displayName).toBeDefined();

        })

    });

    describe('POST /:id/groupMembers', () => {

        beforeEach( async () => {
            await db('usersGroupsMembership').truncate();
            return res = await request(server).post(`/api/groups/${id}/groupMembers`).send(newMember1);
        })

        it('should return 201 OK with JSON resp', () => {
            expect(res.status).toBe(201);
            expect(res.type).toBe('application/json');
        })

        it('should return updated group with new members', () => {
            expect(res.body).toHaveLength(1);

            expect(res.body[0].groupId).toBe(id);
            expect(res.body[0].userId).toBe(newMember1.userId);
            expect(res.body[0].displayName).toBeDefined();

        })

    });

    describe('DELETE /:id/groupMembers/:id', () => {
        
        beforeEach( async () => {
            await db('usersGroupsMembership').truncate();
            await request(server).post(`/api/groups/${id}/groupMembers`).send(newMember1)
            await request(server).post(`/api/groups/${id}/groupMembers`).send(newMember2);
            return res = await request(server).delete(`/api/groups/${id}/groupMembers/${newMember2.userId}`)
        })

        it('should return 200 OK with correct JSON resp', async () => {
            expect(res.status).toBe(200);
            expect(res.type).toBe('application/json');
        })

        it('return updated group without deleted member', async () => {
            expect(res.body).toHaveLength(1);

            expect(res.body[1]).not.toBeDefined();
        })

    });

});

