// Imports
const express = require('express');

// Main Router Declaration
const mainRouter = express.Router();


// Sub Routers
const authRoutes = require('./auth');
const prisonRoutes = require('./prisons');
const prisonerRoutes = require('./prisoners');
const skillRoutes = require('./skills');


// Routes
mainRouter.use('/auth', authRoutes);
mainRouter.use('/prisons', prisonRoutes);
mainRouter.use('/prisoners', prisonerRoutes);
mainRouter.use('/skills', skillRoutes);

mainRouter.use('/', (req, res) => res.send('Welcome to the Main API'));

// Export
module.exports = mainRouter;
