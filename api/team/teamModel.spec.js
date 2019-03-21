const teamModel = require('./teamModel.js');

describe('teamModel', () => {

    describe('getTeam()', () => {

        it('should return list of team members', async () => {
            const res = await teamModel.getTeam();
            expect(res).toHaveLength(6);
            expect(res[1].id).toBe(2);
            expect(res[1].name).toBe("Chelsea Tolnai")
            expect(res[1].displayName).toBe("Chealsea")
        });

    });

});