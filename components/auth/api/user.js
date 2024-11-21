const express = require('express');
const router = express.Router();

// mongodb User Model
const User = require('../models/user');

//password encryption
const bcrypt = require('bcryptjs');


// Login
router.post('/login', (req, res) => {
    let {username, password} = req.body;
    username = username.trim();
    password = password.trim();
    if (username === "" || password === "") {
        res.json({
            status: "FAILED", msg: "Empty credentials applied"
        })
    } else {
        User.findOne({username})
            .then(data => {
                if (data) {
                    const hashedPassword = data.password;
                    bcrypt.compare(password, hashedPassword).then(result => {
                        if (result) {
                            // password matched
                            // res.json({
                            //     status: "SUCCESS", msg: "Login successful", data: data
                            // })
                            const alertMessage = "Login successful!";
                            res.render('login', {alert: alertMessage, alertType: 'success'});
                        } else {
                            const alertMessage = "Login failed, information is incorrect!";
                            res.render('login', {alert: alertMessage, alertType: 'danger'});
                            // res.json({
                            //     status: "FAILED", msg: "Invalid password entered"
                            // })
                        }
                    }).catch(err => {
                        // res.json({
                        //     status: "FAILED", msg: "An error occurred while comparing passwords",
                        // })
                        const alertMessage = "Login failed, information is incorrect!";
                        res.render('login', {alert: alertMessage, alertType: 'danger'});
                    })
                } else {
                    const alertMessage = "Login failed, information is incorrect!";
                    res.render('login', {alert: alertMessage, alertType: 'danger'});
                    // res.json({
                    //     status: "FAILED",
                    //     msg: "Invalid credentials entered"
                    // })
                }
            }).catch(err => {
            // res.json({
            //     status: "FAILED", msg: "An error occurred while checking for existing user"
            // })
            const alertMessage = "Login failed, information is incorrect!";
            res.render('login', {alert: alertMessage, alertType: 'danger'});
        })
    }
});

// Register
router.post('/register', (req, res) => {
    let {username, email, password, re_password} = req.body;
    username = username.trim();
    email = email.trim();
    password = password.trim();
    re_password = re_password.trim();
    if (!username || !email || !password || !re_password) {
        // return res.status(400).json({msg: 'Please enter all fields'});
        return res.render('register', {alert: 'Please enter all fields', alertType: 'danger'});
    } else if (!/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email)) {
        // return res.status(400).json({msg: 'Invalid email'});
        return res.render('register', {alert: 'Invalid email', alertType: 'danger'});
    } else if (password.length < 6) {
        // return res.status(400).json({msg: 'Password must be at least 6 characters'});
        return res.render('register', {alert: 'Password must be at least 6 characters', alertType: 'danger'});
    } else if (password !== re_password) {
        // return res.status(400).json({msg: 'Passwords do not match'});
        return res.render('register', {alert: 'Passwords do not match', alertType: 'danger'});
    }
    else {
        // Check for existing user
        User.findOne({username}).then(user => {
            if (user) {
                // return res.json({
                //     status: "Failed", msg: 'User already exists'
                // });
                const alertMessage = "Register failed, user already exists!";
                res.render('register', {alert: alertMessage, alertType: 'danger'});
            } else {
                // Create new user

                // password encryption
                const saltRounds = 10;
                bcrypt.hash(password, saltRounds).then(hashedPassword => {

                    const newUser = new User({
                        username, email, password: hashedPassword
                    });
                    newUser.save().then(user => {
                        // res.json({
                        //     status: 'Success', msg: 'User registered successfully', data: user
                        // });
                        const alertMessage = "Register successful!";
                        res.render('register', {alert: alertMessage, alertType: 'success'});
                    }).catch(err => {
                        // console.log(err);
                        // res.json({
                        //     status: 'Failed', message: 'An error occurred while registering user'
                        // });
                        const alertMessage = "Register failed";
                        res.render('register', {alert: alertMessage, alertType: 'danger'});
                    });
                }).catch(err => {
                    // console.log(err);
                    // res.json({
                    //     status: 'Failed', message: 'An error occurred while encrypting password'
                    // });
                    const alertMessage = "Register failed";
                    res.render('register', {alert: alertMessage, alertType: 'danger'});
                });
            }
        }).catch(err => {
            // console.log(err);
            // res.json({
            //     status: 'Failed', message: 'An error occurred while checking for existing user'
            // });
            const alertMessage = "Register failed";
            res.render('register', {alert: alertMessage, alertType: 'danger'});
        });
    }
});

module.exports = router;