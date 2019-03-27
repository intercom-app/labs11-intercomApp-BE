const router = require('express').Router();

const groupsModel = require('./groupActivitiesModel');

// api/groups/:id/activities

router.get('/', async (req, res) => {
    let id = req.groupId;
    try {
        const activities = await groupsModel.getGroupActivity(id);
        res.status(200).json(activities);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.post('/', async (req, res) => {
    let groupId = req.groupId;
    let activity = {...req.body, groupId};
    try {
        const newActivity = await groupsModel.addGroupActivity(activity);
        res.status(200).json(newActivity);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;