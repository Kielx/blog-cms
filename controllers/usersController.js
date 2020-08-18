const User = require("../models/user");
const { body, validationResult } = require("express-validator");

module.exports = {
  displayRegister: (req, res) => {
    User.find({})
      .select({})
      .exec(function (err, result) {
        res.render("register", {
          users: result,
          ErrorMessages: req.flash("errorMessages"),
          username: req.flash("username"),
          email: req.flash("email"),
        });
      });
  },

  displayRegister2: (req, res) => {
    User.find({})
      .select({})
      .exec(function (err, result) {
        res.render("register2", {
          users: result,
          ErrorMessages: req.flash("errorMessages"),
          username: req.flash("username"),
          email: req.flash("email"),
          passwords: req.flash("passwords"),
        });
      });
  },

  register2: (req, res) => {
    /*     if (req.body.Password !== req.body.Password2) {
      req.flash("passwords", "Passwords do not match!");
      res.redirect("/users/register2");
    } */

    const errors = validationResult(req);
    console.log(req.body);

    if (!errors.isEmpty()) {
      return res.status(422).jsonp(errors.array());
    }

    errorMessages = [];
    User.create({
      username: req.body.Username,
      password: req.body.Password,
      email: req.body.email,
    })
      .then((newUser) => {
        res.redirect("/users/login");
      })
      .catch((err) => {
        if (err.errors["username"]) {
          errorMessages.push(
            `Username you entered ${err.errors["username"].message}`
          );
        }
        if (err.errors["password"]) {
          errorMessages.push(`Password ${err.errors["password"].message}`);
        }
        if (err.errors["email"]) {
          errorMessages.push(
            `E-mail you entered ${err.errors["email"].message}`
          );
        }
        req.flash("username", req.body.Username);
        req.flash("email", req.body.email);
        req.flash("errorMessages", errorMessages);
        res.redirect("/users/register2");
      });
  },

  register: (req, res) => {
    errorMessages = [];
    User.create({
      username: req.body.Username,
      password: req.body.Password,
      email: req.body.email,
    })
      .then((newUser) => {
        res.redirect("/users/login");
      })
      .catch((err) => {
        if (err.errors["username"]) {
          errorMessages.push(
            `Username you entered ${err.errors["username"].message}`
          );
        }
        if (err.errors["password"]) {
          errorMessages.push(`Password ${err.errors["password"].message}`);
        }
        if (err.errors["email"]) {
          errorMessages.push(
            `E-mail you entered ${err.errors["email"].message}`
          );
        }
        req.flash("username", req.body.Username);
        req.flash("email", req.body.email);
        req.flash("errorMessages", errorMessages);
        res.redirect("/users/register");
      });
  },
};
