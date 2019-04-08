const router = require('express').Router();

const usersModel = require('./userDetailedModel');

// api/users/:id/detailed

router.get('/', async (req, res) => {
    let id = req.userId;
    try {
        const user = await usersModel.getUserDetailed(id);
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;