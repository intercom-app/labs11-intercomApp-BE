const express = require('express');
const cors = require('cors');

const teamRouter = require('./team/teamRouter');
const usersRouter = require('./users/usersRouter');

const server = express();

server.use(cors());
server.use(express.json());

server.use('/api/team', teamRouter);
server.use('/api/users', usersRouter);

server.get('/', (req, res) => {
    res.send('Hello World!');
});

module.exports = server;