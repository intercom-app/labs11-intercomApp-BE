const router = require('express').Router();

const groupsModel = require('./groupActivitiesModel');

router.get('/', async (req, res) => {
    let id = req.groupId;
    try {
        const activities = await groupsModel.getGroupActivity(id);
        res.status(200).json(activities);
    } catch (err) {
        res.status(500).json(err);
    }
});


module.exports = router;