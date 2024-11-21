// routes/auth.routes.js
const { Router } = require('express');
const User = require("../models/User.model")
const { default: mongoose } = require('mongoose');
const router = new Router();

// GET route ==> to display the signup form to users
module.exports.signUp = (req,res) => {
    res.render('auth/signup')
}
// POST route ==> to process form data

module.exports.doSignUp = (req, res, next) => {
    User.create(req.body)
    .then((user) => {
        user.checkPassword(req.body.passwordHash)
        res.redirect("/login");
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        res.render("signup", {
          user: {
            email: req.body.email,
          },
          errors: err.errors,
        });
      } else {
        next(err);
      }
    })
}