require("dotenv");
const VoiceResponse = require("twilio").twiml.VoiceResponse;
const AccessToken = require("twilio").jwt.AccessToken;
const accountSid = process.env.ACCOUNT_SID;
const VoiceGrant = AccessToken.VoiceGrant;
const apiKey = process.env.API_KEY;
const apiKeySecret = process.env.API_KEY_SECRET;
const pushCredSid = process.env.PUSH_CREDENTIAL_SID;
const outgoingApplicationSid = process.env.APP_SID;
const callerNumber = process.env.CALLER_ID;
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
        statusCallbackEvent: 'start end join leave mute hold'
    }, to);
  }
  return voiceResponse.toString();
}

/* exports.voiceResponse = function voiceResponse(toNumber) {
  // Create a TwiML voice res
  const twiml = new VoiceResponse();

  if (toNumber) {
    // Wrap the phone number or client name in the appropriate TwiML verb
    // if is a valid phone number
    const attr = isAValidPhoneNumber(toNumber) ? "number" : "client";

    const dial = twiml.dial({
      callerId: process.env.CALLER_ID
    });
    dial[attr]({}, toNumber);
  } else {
    twiml.say("Thanks for calling!");
  }

  return twiml.toString();
}; */

exports.registerBinding = function registerBinding(req, res) {

  client.notify.services(process.env.SERVICE_SID)
  .bindings
  .create({
     identity: req.body.identity,
     address: req.body.Address,
     bindingType: 'apn',
     endpoint: 'endpoint_id',
     tags: req.body.tags
   })
  .then(binding)
  .catch(err => console.error(err))
};

exports.sendNotification = async function sendNotification(req, res) {

  // Create a reference to the user notification service
  try {
  console.log("body: id", req.body);
  messageBody = await `A group chat has started.`
  if (req.body.statusCallbackEvent == 'participant-join') {
    messageBody = await `A user has joined ${group}'s chatroom`
  } else if (req.body.statusCallbackEvent == 'conference-end') {
    messageBody = await `All users have left ${group}'s chatroom`
  }
  await client.notify.services(process.env.SERVICE_SID)
             .notifications
             .create(await {body: messageBody, tag: req.body.FriendlyName})
             .then(notification => console.log(notification.sid))
 } catch(error){
   console.error(error);
 }};
