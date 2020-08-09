const express = require("express");
const path = require("path");
const markdown = require("marked");

const Post = require("../models/post");
router = express.Router();

module.exports = router;

router.post("/posts/change/", (req, res) => {
  Post.findByIdAndUpdate(
    req.body.id,
    {
      title: req.body.title,
      content: req.body.content,
    },
    function (err) {
      if (err) return handleError(err);
    }
  );
  res.redirect("/");
});

router.get("/posts/change/", (req, res) => {
  Post.find({ title: req.query.post })
    .select({})
    .exec(function (err, result) {
      res.render("change", {
        post: result,
      });
    });
});

router.get("/posts/search/", (req, res) => {
  Post.find({ title: new RegExp(req.query.psearch, "ig") })
    .select({})
    .exec(function (err, result) {
      res.render("indexNew", {
        posts: result,
      });
    });
});

router.get("/posts/add", (req, res) => {
  Post.find({})
    .select({})
    .exec(function (err, result) {
      res.render("add", {
        posts: result,
      });
    });
});

router.post("/posts/add", (req, res) => {
  Post.create({ title: req.body.title, content: req.body.content });
  res.redirect("/");
});

router.get("/posts/delete", (req, res) => {
  Post.find({})
    .select({})
    .exec(function (err, result) {
      res.render("delete", {
        posts: result,
      });
    });
});

router.post("/posts/delete", (req, res) => {
  Post.deleteOne({ title: req.body.title }, function (err) {
    if (err) return handleError(err);
    // deleted at most one tank document
  });
  res.redirect("/posts/delete");
});

router.get(["/posts/:postname"], (req, res) => {
  Post.find({})
    .select({})
    .exec(function (err, result) {
      res.render("post", {
        posts: result,
        params: req.params,
        markdown: markdown,
      });
    });
});

router.get("/", (req, res) => {
  Post.find({})
    .select({})
    .exec(function (err, result) {
      res.render("index", {
        posts: result,
      });
    });
});
