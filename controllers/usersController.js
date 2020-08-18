const User = require("../models/user");
const { validationResult } = require("express-validator");

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
          passwords: req.flash("passwords"),
        });
      });
  },

  register: (req, res) => {
    const errors = validationResult(req);
    errorMessages = [];

    if (!errors.isEmpty()) {
      errors.array().forEach((err) => {
        errorMessages.push(err.msg);
      });
      req.flash("errorMessages", errorMessages);
      req.flash("username", req.body.username);
      req.flash("email", req.body.email);
      res.redirect("/users/register");
    }

    User.create({
      username: req.body.username,
      password: req.body.password,
      email: req.body.email,
    }).then((newUser) => {
      res.redirect("/users/login");
    });
  },
};
