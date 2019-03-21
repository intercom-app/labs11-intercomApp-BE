const express = require('express');
const cors = require('cors');

const teamRouter = require('./team/teamRouter');

const server = express();

server.use(cors());
server.use(express.json());

server.use('/api/team', teamRouter);

server.get('/', (req, res) => {
    res.send('Hello World!');
});

module.exports = server;