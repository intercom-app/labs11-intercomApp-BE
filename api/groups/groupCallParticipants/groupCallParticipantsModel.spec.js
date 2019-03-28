const groupModel = require('./groupCallParticipantsModel.js');
const db = require('../../../data/dbConfig.js');
const { dbReset, user1, user2, newParticipant1, newParticipant2 } = require('../../serverTestReset.js');

describe('groupCallParticipantsModel', () => {

    let res;
    const id = 1;

    beforeEach(async () => {
        await dbReset();
    })

    describe('getParticipants()', () => {

        it('should return list all call participants of group by specified group ID', async () => {
            res = await groupModel.getParticipants(id);
            expect(res).toHaveLength(1);
            expect(res[0].groupId).toBe(newParticipant1.groupId);
            expect(res[0].userId).toBe(newParticipant1.userId);
            expect(res[0].displayName).toBe(user1.displayName);

        });

    });

    describe('addParticipant()', () => {

        it('should add new call participant to group', async () => {
            res = await groupModel.addParticipant(newParticipant2);
            expect(res).toHaveLength(2);
            expect(res[1].groupId).toBe(newParticipant2.groupId);
            expect(res[1].userId).toBe(newParticipant2.userId);
            expect(res[1].displayName).toBe(user2.displayName);

        });

    });

    describe('deleteAllParticipants()', () => {

        it('should delete all call participants by sepcified group id and return count', async () => {
            await db('usersGroupsParticipants').insert(newParticipant2);

            res = await groupModel.getParticipants(id);
            expect(res).toHaveLength(2);

            await groupModel.deleteAllParticipants(newParticipant2.groupId);
            
            res = await groupModel.getParticipants(id);
            expect(res).toEqual([]);

        });

    });

    describe('deleteParticipant()', () => {

        it('should delete the call participant by sepcified id and return updated group', async () => {
            await db('usersGroupsParticipants').insert(newParticipant2);

            const resInit = await groupModel.getParticipants(id);
            expect(resInit).toHaveLength(2);
            expect(resInit[1].groupId).toBe(newParticipant2.groupId);
            expect(resInit[1].userId).toBe(newParticipant2.userId);
            expect(resInit[1].displayName).toBe(user2.displayName);

            await groupModel.deleteParticipant(newParticipant2.userId, newParticipant2.groupId);
            
            res = await groupModel.getParticipants(id);
            expect(res).toHaveLength(1);
            expect(res[1]).not.toBeDefined();

        });

    });

});