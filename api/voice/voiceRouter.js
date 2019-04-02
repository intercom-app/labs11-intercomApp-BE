const Router = require('express').Router;

const {tokenGenerator, voiceResponse} = require('./voiceHandler');

const router = new Router();

router.get('/token', (req, res) => {
  res.send(tokenGenerator());
});

router.post('/', (req, res) => {
  res.send(voiceResponse(req.body.To));
});

module.exports = router;