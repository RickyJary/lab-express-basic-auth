// routes/auth.routes.js
const { Router } = require('express');
const User = require("../models/User.model")
const { default: mongoose } = require('mongoose');
const router = new Router();

// GET route ==> to display the signup form to users
module.exports.signUp = (req, res, next) => {
    res.render('auth/signup')
}


// POST route ==> to process form data

module.exports.doSignUp = (req, res, next) => {
    User.create(req.body)
    .then((user) => {
        user.checkPassword(req.body.passwordHash)
        res.redirect("/logIn");
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

module.exports.logIn = (req, res, next) => {
  res.render("auth/logIn")
}

module.exports.doLogIn = (req, res, next) => {
  const { email, passwordHash } = req.body;
  User.findOne({ email })
  .then((user) => {
    if(!user) {
      res.redirect("/logIn");
    } else {
      user.checkPassword(passwordHash)
      .then((match) => {
        if(match) {
          res.redirect("/profile");
        } else {
          res.redirect("/logIn")
        }
      })
    }
  })
  .catch((err) => {
    console.error(err)
  })
}