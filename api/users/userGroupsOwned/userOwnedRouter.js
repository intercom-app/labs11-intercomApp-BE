const router = require('express').Router();

const usersModel = require('./userOwnedModel');

// api/users/:id/groupsOwned

router.get('/', async (req, res) => {
    let id = req.userId;
    try {
        const groups = await usersModel.getGroups(id);
        res.status(200).json(groups);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;