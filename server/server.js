// Imports
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

// Server Declaration
const server = express();

// Main Router
const mainRouter = require('./components/main-router');

// Middleware
server.use(express.json());
server.use(cors());
server.use(helmet());

// Routes
server.use('/api', mainRouter);

server.use('/', (req, res) => res.send('It\'s working !!\nIt\'s working !!'));

// Export
module.exports = server;