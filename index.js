const express = require("express");
const server = express();
const cors = require("cors");
server.use(cors());
server.use(express.json());

server.get('/', (req, res) => {
    res.send('Hello World!');
  });

const port = 3300;
server.listen(port, function() {
  console.log(`\n Web API Listening on localhost:${port}\n`);
});
