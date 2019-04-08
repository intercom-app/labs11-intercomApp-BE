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

router.get('/incoming', function(req, res) {
  res.send(voiceHandler.incoming());
});

router.post('/incoming', function(req, res) {
  res.send(voiceHandler.incoming());
});

router.get('/ntstoken', (req, res) => {
  res.send(voiceHandler.generateNTSToken());
});

router.get('/makeCall', (req, res) => {
  res.send(voiceHandler.makeCall(req, res));
});

router.post('/makeCall', (req, res) => {
  res.send(voiceHandler.makeCall(req, res));
});

router.get('/placeCall', (req, res) => {
  res.send(voiceHandler.placeCall(req, res));
});

router.post('/placeCall', (req, res) => {
  res.send(voiceHandler.placeCall(req, res));
});

router.post('/', (req, res) => {
  res.send(voiceHandler.voiceResponse(req.body.To));
});

module.exports = router;