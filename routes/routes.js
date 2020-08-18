const express = require("express");
const { body, check, validationResult } = require("express-validator");
router = express.Router();

const postsController = require("../controllers/postsController");
const usersController = require("../controllers/usersController");

router.post(
  "/users/register2",
  [
    check("Password2", "Passwords do not match").custom(
      (value, { req }) => value === req.body.Password
    ),
  ],
  usersController.register2
);

router.get("/users/register2", usersController.displayRegister2);
router.get("/users/register", usersController.displayRegister);
router.post("/users/register", usersController.register);
router.post("/posts/change/", postsController.updatePost);
router.get("/posts/change/", postsController.updatePostRoute);
router.get("/posts/search/", postsController.searchPostRoute);
router.get("/posts/add", postsController.addPostRoute);
router.post("/posts/add", postsController.addPost);
router.get("/posts/delete", postsController.deletePostRoute);
router.post("/posts/delete", postsController.deletePost);
router.get("/posts/:postname", postsController.displayPost);
router.get("/", postsController.displayIndex);

module.exports = router;
