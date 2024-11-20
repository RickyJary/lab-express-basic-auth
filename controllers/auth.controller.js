// routes/auth.routes.js

const { Router } = require('express');
const router = new Router();

// GET route ==> to display the signup form to users
module.exports.signUp = (req, res, next) => {
    res.render('auth/signup')
}

module.exports.doSignUp = (req, res, next) => {
    User.create(req.body)
    .then((user) => {
        user.checkPassword(req.body.passwordHash);
        res.redirect("/")
    })
}
// POST route ==> to process form data

