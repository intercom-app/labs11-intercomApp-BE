const db = require('***');

const teamModel = require('./teamModel');

describe('teamModel', () => {

    describe('getTeam()', () => {

        it('should return list of team members', async () => {
            const res = await teamModel.getTeam();
            expect(res.body).toBeDefined();
        });

    });

});