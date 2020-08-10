const express = require("express");

router = express.Router();

const postsController = require("../controllers/postsController");

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
