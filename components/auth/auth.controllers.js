const { registerHandler } = require('./auth.service');
const passport = require("passport");

// Login controller
const login = (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/login'
    })(req, res, next);
};

// Register controller
const register = (req, res) => {
    let { username, email, password, re_password } = req.body;
    username = username.trim();
    email = email.trim();
    password = password.trim();
    re_password = re_password.trim();
    registerHandler(username, email, password, re_password, res);
};

module.exports = { login, register };