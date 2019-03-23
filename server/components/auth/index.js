// Imports
const express = require('express');
const bcrypt = require('bcryptjs');

// Router Declaration
const router = express.Router();
const db = require('../prisons/prisonsModel');
const jwt = require('./jwtModel');

router.use(express.json())
// Routes
router.post('/register', async (req, res) => {
    const registration = req.body;

    try {
        if(!registration.location || registration.location === ''){
            res
                .status(401)
                .json({
                    errorMessage: 'Location is required'
                });
        } else {
            let existingPrison = await db.findBy({location: registration.location}).first();

            if(existingPrison){
                res
                    .status(412)
                    .json({
                        errorMessage: `${registration.location} already exists`
                    });
            } else {
                if(!registration.population){
                    res
                        .status(401)
                        .json({
                            errorMessage: 'Population is required'
                        });
                } else if(!registration.password || registration.password.length < 12) {
                    res
                        .status(401)
                        .json({
                            errorMessage: 'password over 12 chars is required'
                        });
                } else {

                    let hash = bcrypt.hashSync(registration.password, 14);

                    registration.password = hash;

                    const newPrison = await db.create(registration);

                    res
                        .status(201)
                        .json(newPrison);
                }
            }
        }
    } catch (err) {
        res
            .status(500)
            .json({
                errorMessage: 'Houston, we have a problem in AUTH'
            })
    }
});

router.post('/login', async (req, res) => {
    let {
        location,
        password
    } = req.body;

    try {

        if(!location || !password ){
            res
                .status(401)
                .json({
                    errorMessage: 'Please provide a location AND password to login'
                });
        }
        
        let prison = await db.findBy({
            location
        }).first();

        if (prison && bcrypt.compareSync(password, prison.password)) {
            const token = jwt.generateToken(prison);

            prison = await db.readOne(prison.id);

            res
                .status(200)
                .json({
                    message: `Welcome ${prison.location}!, have a token...`,
                    token,
                    prison
                });
        } else {
            res
                .status(401)
                .json({
                    message: 'Invalid Credentials'
                });
        }
    } catch (err) {
        res
            .status(500)
            .json({
                errorMessage: 'Houston, we have a problem in AUTH'
            });
    }
});


router.use('/', (req, res) => res.send('Welcome to the AuthN & AuthZ'));

// Export
module.exports = router;
