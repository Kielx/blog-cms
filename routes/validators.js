const { body, check, validationResult } = require("express-validator");
const User = require("../models/user");

module.exports = {
  checkIfPasswordsMatch: check("password2", "Passwords do not match").custom(
    (value, { req }) => value === req.body.password
  ),

  checkIfEmailExists: check("email").custom((value) => {
    return User.find({ email: value })
      .select({})
      .then((result) => {
        if (result.length > 0) {
          return Promise.reject("E-mail is already in use");
        }
      });
  }),

  checkIfUsernameExists: check("username").custom((value) => {
    return User.find({ username: value })
      .select({})
      .then((username) => {
        if (username.length > 0) {
          return Promise.reject("Username is already in use");
        }
      });
  }),

  checkPassword: check(
    "password",
    "The password must be 5+ chars long and contain a number"
  )
    .not()
    .isEmpty()
    .isLength({ min: 5 })
    .matches(/\d/),

  checkUsername: check("username")
    .trim()
    .not()
    .isEmpty()
    .escape()
    .withMessage("Username provided is invalid"),

  checkEmail: check("email")
    .trim()
    .not()
    .isEmpty()
    .normalizeEmail()
    .escape()
    .withMessage("E-mail provided is invalid"),
};
