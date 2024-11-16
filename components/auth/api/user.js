const express = require('express');
const router = express.Router();

// mongodb User Model
const User = require('../models/User');

//password encryption
const bcrypt = require('bcryptjs');


// Login
router.post('/login', (req, res) => {
});

// Register
router.post('/register', (req, res) => {

    let {username, email, password} = req.body;
    name = username.trim();
    email = email.trim();
    password = password.trim();
    if (!name || !email || !password) {
        return res.status(400).json({msg: 'Please enter all fields'});
    } else if (!/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email)) {
        return res.status(400).json({msg: 'Invalid email'});
    } else if (password.length < 6) {
        return res.status(400).json({msg: 'Password must be at least 6 characters'});
    } else {
        // Check for existing user
        User.find({email}).then(user => {
            if (user.length > 0) {
                return res.json({
                    status: "Failed",
                    msg: 'User already exists'
                });
            } else {
                // Create new user

                // password encryption
                const saltRounds = 10;
                bcrypt.hash(password, saltRounds).then(hashedPassword => {

                    const newUser = new User({
                        name,
                        email,
                        password: hashedPassword
                    });


                    newUser.save().then(user => {
                        res.json({
                            status: 'Success',
                            msg: 'User registered successfully',
                            data: user
                        });
                    }).catch(err => {
                        console.log(err);
                        res.json({
                            status: 'Failed',
                            message: 'An error occurred while registering user'
                        });
                    });

                }).catch(err => {
                    console.log(err);
                    res.json({
                        status: 'Failed',
                        message: 'An error occurred while encrypting password'
                    });
                });
            }

        }).catch(err => {
            console.log(err);
            res.json({
                status: 'Failed',
                message: 'An error occurred while checking for existing user'
            });
        });
    }
});

module.exports = router;