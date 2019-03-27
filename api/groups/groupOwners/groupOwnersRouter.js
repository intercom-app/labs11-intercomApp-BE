const router = require('express').Router();

const groupsModel = require('./groupOwnersModel');

router.get('/', async (req, res) => {
    let id = req.groupId;
    try {
        const owners = await groupsModel.getGroupOwners(id);
        res.status(200).json(owners);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;