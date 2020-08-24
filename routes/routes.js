const express = require("express");
const validators = require("./validators");

router = express.Router();

const postsController = require("../controllers/postsController");
const usersController = require("../controllers/usersController");

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
router.get("/posts/add", postsController.addPostRoute);
router.post("/posts/add", postsController.addPost);
router.get("/posts/delete", postsController.deletePostRoute);
router.post("/posts/delete", postsController.deletePost);
router.get("/posts/:postname", postsController.displayPost);
router.get(
  ["/", "/index", "/index.htm", "/index.html"],
  postsController.displayIndex
);

module.exports = router;
