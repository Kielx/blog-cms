const User = require("../models/user");

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
