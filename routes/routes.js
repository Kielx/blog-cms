const express = require("express");
const validators = require("./validators");
const passport = require("passport");
const { ensureLoggedIn } = require("connect-ensure-login");

router = express.Router();

const postsController = require("../controllers/postsController");
const usersController = require("../controllers/usersController");

router.get("/users/logout", function (req, res) {
  req.logout();
  res.redirect("/");
});

router.get(
  "/users/admin",
  require("connect-ensure-login").ensureLoggedIn("/users/login"),
  usersController.displayAdmin
);

router.post(
  ["/users/login", "/users/login.html"],
  passport.authenticate("local", {
    successReturnToOrRedirect: "/",
    failureRedirect: "/users/login",
    failureFlash: true,
  })
);
router.post(
  "/users/register",
  [
    validators.checkIfPasswordsMatch,
    validators.checkPassword,
    validators.checkUsername,
    validators.checkEmail,
    validators.checkIfEmailExists,
    validators.checkIfUsernameExists,
  ],
  usersController.register
);
router.get(["/users/login", "/users/login.html"], usersController.displayLogin);
router.get(
  ["/users/register", "/users/register.html"],
  usersController.displayRegister
);
router.post("/posts/change/", postsController.updatePost);
router.get("/posts/change/", postsController.updatePostRoute);
router.get("/posts/search/", postsController.searchPostRoute);
router.get(
  "/posts/add",
  ensureLoggedIn("/users/login"),
  postsController.addPostRoute
);
router.post("/posts/add", postsController.addPost);
router.get("/posts/delete", postsController.deletePostRoute);
router.post("/posts/delete", postsController.deletePost);
router.get("/posts/:postname", postsController.displayPost);
router.get(
  ["/", "/index", "/index.htm", "/index.html"],
  postsController.displayIndex
);

module.exports = router;
