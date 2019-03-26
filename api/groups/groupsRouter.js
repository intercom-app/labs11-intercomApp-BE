const router = require('express').Router();

const groupsModel = require('./groupsModel');

router.get('/', async (req, res) => {
    try {
        const groups = await groupsModel.getAllGroups();
        res.status(200).json(groups);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const group = await groupsModel.getGroupByID(id);
        res.status(200).json(group);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/:id/groupMembers', async (req, res) => {
    const id = req.params.id;
    try {
        const members = await groupsModel.getGroupMembers(id);
        res.status(200).json(members);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/:id/groupOwners', async (req, res) => {
    const id = req.params.id;
    try {
        const owners = await groupsModel.getGroupOwners(id);
        res.status(200).json(owners);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/:id/activities', async (req, res) => {
    const id = req.params.id;
    try {
        const activities = await groupsModel.getGroupActivity(id);
        res.status(200).json(activities);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/:id/callStatus', async (req, res) => {
    const id = req.params.id;
    try {
        const callStatus = await groupsModel.getGroupCallStatus(id);
        res.status(200).json(callStatus);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;