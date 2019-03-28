const router = require('express').Router();

const usersModel = require('./userBelongedModel');

// api/users/:id/groupsBelongedTo

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