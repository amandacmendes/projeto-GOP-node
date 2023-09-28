require('./database');
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const { routes } = require('./routes');

const server = express();

server.use(cors());
server.use(express.json());
server.use(routes);

const port = process.env.PORT || 8080;

server.listen(port, () => {
    console.log(`Server started on port ${port}!`);
});
