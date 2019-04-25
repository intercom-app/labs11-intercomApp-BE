require("dotenv");
const VoiceResponse = require("twilio").twiml.VoiceResponse;
const AccessToken = require("twilio").jwt.AccessToken;
const authToken = process.env.AUTH_TOKEN;
const accountSid = process.env.ACCOUNT_SID;
const VoiceGrant = AccessToken.VoiceGrant;
const apiKey = process.env.API_KEY;
const apiKeySecret = process.env.API_KEY_SECRET;
const pushCredSid = process.env.PUSH_CREDENTIAL_SID;
const outgoingApplicationSid = process.env.APP_SID;
const callerNumber = process.env.CALLER_ID;
const client = require("twilio")(accountSid, authToken);
const urlencoded = require('body-parser').urlencoded;

exports.tokenGenerator = function tokenGenerator(req) {
  const defaultIdentity = Date.now();
  var identity = null;
  if (req.method == 'POST') {
    identity = req.body.identity;
  } else {
    identity = req.query.identity;
  
  }
  

  if(!identity) {
    identity = defaultIdentity;
}
  const voiceGrant = new VoiceGrant({
    outgoingApplicationSid: outgoingApplicationSid,
    pushCredentialSid: pushCredSid
  }); 

  const token = new AccessToken(accountSid, apiKey, apiKeySecret);
  token.addGrant(voiceGrant);
  token.identity = identity;
  // Include identity and token in a JSON res
  return token.toJwt();
};

exports.makeCall = function makeCall(request, response) {
  // The recipient of the call, a phone number or a client
  var to = null;

  if (request.method == 'POST') {
    to = request.body.to;
  } else {
    to = request.query.to;
  }
  const voiceResponse = new VoiceResponse();

  if (!to) {
      voiceResponse.say("No group detected.");
  }  else {
      const dial = voiceResponse.dial({callerId : callerNumber});
      dial.conference({
        statusCallback: 'https://intercom-be.herokuapp.com/api/voice/send-notification',
        statusCallbackEvent: 'start join'
    }, to);
  }
  return voiceResponse.toString();
}

exports.registerBinding = function registerBinding(req, res) {

  client.notify.services(process.env.SERVICE_SID)
  .bindings
  .create({
     identity: req.body.identity,
     address: req.body.Address,
     bindingType: 'apn',
     endpoint: 'endpoint_id',
     tag: req.body.tags
   })
  .then(binding => console.log(binding.sid))
  .catch(err => console.error(err))
};

exports.sendNotification = async function sendNotification(req, res) {

  // Create a reference to the user notification service
  try {
  messageBody = await `A group chat has started.`
  await client.notify.services(process.env.SERVICE_SID)
             .notifications
             .create(await {body: messageBody, tag: req.body.FriendlyName})
             .then(notification => console.log(notification.sid))
 } catch(error){
   console.error(error);
 }};