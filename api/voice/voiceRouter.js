const Router = require('express').Router;

const voiceHandler = require('./voiceHandler');

const router = new Router();
var bodyParser = require('body-parser')
router.use(bodyParser())
/**
 * Generate a Capability Token for a Twilio Client user - it generates a random
 * username for the client requesting a token.
 */
router.get('/accessToken', (req, res) => {
  res.send(voiceHandler.tokenGenerator(req));
});

router.get('/makeCall', (req, res) => {
  res.send(voiceHandler.makeCall(req, res));
});

router.post('/makeCall', (req, res) => {
  res.send(voiceHandler.makeCall(req, res));
});

router.post('/register-binding', (req, res) => {
  res.send(voiceHandler.registerBinding(req, res));
});
module.exports = router;