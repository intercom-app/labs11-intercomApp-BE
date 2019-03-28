const express = require('express');
const cors = require('cors');
// var bodyParser = require('body-parser')
// var jsonParser = bodyParser.json()

const teamRouter = require('./team/teamRouter');
const usersRouter = require('./users/usersRouter');
const groupRouter = require('./groups/groupsRouter');
const voiceRouter = require('./voice/voiceRouter');

const db = require('../data/dbConfig.js');
const server = express();

server.use(cors());
server.use(express.json());


const VoiceResponse = require('twilio').twiml.VoiceResponse;
const urlencoded = require('body-parser').urlencoded;


server.use('/api/team', teamRouter);
server.use('/api/users', usersRouter);
server.use('/api/groups', groupRouter);
server.use('/api/voice', voiceRouter);

server.get('/', (req, res) => {
    res.send('Hello World!');
});

server.post('/test', (req, res) => {
    console.log('req', req.body)    
    res.send('Hello World!');
});

server.post('/api/voice', (request, response) => {
    // Use the Twilio Node.js SDK to build an XML response
    const twiml = new VoiceResponse();
  
    // Start with a <Dial> verb
    const dial = twiml.dial();
      dial.conference('My conference', {
        startConferenceOnEnter: true,
      });
  
    // Render the response as XML in reply to the webhook request
    response.type('text/xml');
    response.send(twiml.toString());
  });

module.exports = server;