const express = require("express");
const server = express();
const cors = require("cors");

const teamRouter = require('./api/team/teamRouter.js');

server.use(cors());
server.use(express.json());

server.use('/api/team', teamRouter);

server.get('/', (req, res) => {
  res.send('Hello World!');
});

const port = process.env.PORT || 3300;
server.listen(port, function() {
  console.log(`\n Web API Listening on localhost:${port}\n`);
});
