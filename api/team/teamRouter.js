const router = require('express').Router();

const teamModel = require('./teamModel');

router.get('/', async (req, res) => {
    try {
        const teamMems = await teamModel.getTeam();
        res.status(200).json(teamMems);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;