const router = require('express').Router();

const groupsModel = require('./groupCallStatusModel');

router.get('/', async (req, res) => {
    let id = req.groupId;
    try {
        const callStatus = await groupsModel.getGroupCallStatus(id);
        res.status(200).json(callStatus);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.put('/', async (req, res) => {
    let id = req.groupId;
    try {
        await groupsModel.updateCallStatus(id, {...req.body});
        const updatedCallStatus = await groupsModel.getGroupCallStatus(id);
        res.status(200).json(updatedCallStatus);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;