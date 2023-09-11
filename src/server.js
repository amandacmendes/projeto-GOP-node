require('./database');
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const { routes } = require('./routes');

const server = express();

server.use(express.json());
server.use(cors());
server.use(routes);

server.listen(8080, () => {
    console.log('🚀 Server started!');
});
