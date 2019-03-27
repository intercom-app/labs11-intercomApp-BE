const request = require('supertest');

const server = require('../../server');

const db = require('../../../data/dbConfig');

describe('groupOwnersRouter', () => {

    it('should set testing environment', () => {
        expect(process.env.DB_ENV).toBe('testing');
    });

    const group1 = {
        name: 'Group1',
    };

    const newOwner1 = {
        userId: 1,
    };

    const newOwner2 = {
        userId: 2,
    };

    let id, res;

    beforeEach(async () => {
        await db('groups').truncate();
        [id] = await db('groups').insert(group1);
        return id;
    })

    describe('GET /:id/groupOwners', () => {
        
        beforeEach(async () => {
            return res = await request(server).get(`/api/groups/${id}/groupOwners`)
        })

        it('should return 200 OK with JSON resp', async () => {
            expect(res.status).toBe(200);
            expect(res.type).toBe('application/json');
        })

        it('should return list of groupOwners displayNames with user and group id', () => {
            expect(res.body).toBeDefined();
            expect(res.body).toHaveLength;
            expect(res.body[0].groupId).toBe(id);
            expect(res.body[0].userId).toBeDefined();
            expect(res.body[0].displayName).toBeDefined();

        })

    });

    describe('POST /:id/groupOwners', () => {

        beforeEach( async () => {
            await db('usersGroupsOwnership').truncate();
            return res = await request(server).post(`/api/groups/${id}/groupOwners`).send(newOwner1);
        })

        it('should return 201 OK with JSON resp', () => {
            expect(res.status).toBe(201);
            expect(res.type).toBe('application/json');
        })

        it('should return updated group with new owners', () => {
            expect(res.body).toHaveLength(1);
            expect(res.body[0].groupId).toBe(id);
            expect(res.body[0].userId).toBe(newOwner1.userId);
            expect(res.body[0].displayName).toBeDefined();

        })

    });

    describe('DELETE /:id/groupOwners/:id', () => {
        
        beforeEach( async () => {
            await db('usersGroupsOwnership').truncate();
            await request(server).post(`/api/groups/${id}/groupOwners`).send(newOwner1)
            await request(server).post(`/api/groups/${id}/groupOwners`).send(newOwner2);
            return res = await request(server).delete(`/api/groups/${id}/groupOwners/${newOwner2.userId}`)
        })

        it('should return 200 OK with correct JSON resp', async () => {
            expect(res.status).toBe(200);
            expect(res.type).toBe('application/json');
        })

        it('return updated group without deleted owner', async () => {
            expect(res.body).toHaveLength(1);
            expect(res.body[1]).not.toBeDefined();
        })

    });

});

