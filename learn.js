const express = require('express');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const session = require('express-session');

// Fake user database
const users = [
    { id: 1, username: 'admin', passwordHash: bcrypt.hashSync('password', 10) },
];

// Initialize Express app
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(session({ secret: 'secretKey', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session()); // 7

// Passport Local Strategy
passport.use(new LocalStrategy( // 4
    async (username, password, done) => {
        const user = users.find((u) => u.username === username);
        if (!user) return done(null, false, { message: 'Incorrect username.' });
        const isMatch = await bcrypt.compare(password, user.passwordHash);
        if (!isMatch) return done(null, false, { message: 'Incorrect password.' });
        return done(null, user);
    }
));

// Serialize and Deserialize User
passport.serializeUser((user, done) => done(null, user.id));  // 5
passport.deserializeUser((id, done) => { // 8
    const user = users.find((u) => u.id === id);
    done(null, user);
});

// Routes
app.get('/', (req, res) => res.send('Home Page')); // 1
app.get('/login', (req, res) => res.send('<form method="post" action="/login"><input name="username"><input type="password" name="password"><button type="submit">Login</button></form>')); // 2
app.post('/login', passport.authenticate('local', { successRedirect: '/profile', failureRedirect: '/login' })); // 3
app.get('/profile', (req, res) => {
    if (!req.isAuthenticated()) return res.redirect('/login'); // 6
    res.send(`Welcome ${req.user.username}`);
});

// Server
app.listen(3000, () => console.log('Server started on http://localhost:3000'));
