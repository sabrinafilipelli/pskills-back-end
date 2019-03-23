// Imports
const express = require('express');

// Router Declaration
const router = express.Router();


// Routes
router.use('/', (req, res) => res.send('Welcome to the Skills API'));

// Export
module.exports = router;
