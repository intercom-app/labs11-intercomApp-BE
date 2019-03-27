const router = require('express').Router();

const groupsModel = require('./groupMembersModel');

router.get('/', async (req, res) => {
    let id = req.groupId;
    try {
        const members = await groupsModel.getGroupMembers(id);
        res.status(200).json(members);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;