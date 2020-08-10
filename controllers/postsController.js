const Post = require("../models/post");
const markdown = require("marked");

module.exports = {
  updatePost: (req, res) => {
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
  },

  updatePostRoute: (req, res) => {
    Post.find({ title: req.query.post })
      .select({})
      .exec(function (err, result) {
        res.render("change", {
          post: result,
        });
      });
  },

  searchPostRoute: (req, res) => {
    Post.find({ title: new RegExp(req.query.psearch, "ig") })
      .select({})
      .exec(function (err, result) {
        res.render("indexNew", {
          posts: result,
        });
      });
  },

  addPostRoute: (req, res) => {
    Post.find({})
      .select({})
      .exec(function (err, result) {
        res.render("add", {
          posts: result,
        });
      });
  },

  addPost: (req, res) => {
    Post.create({ title: req.body.title, content: req.body.content });
    res.redirect("/");
  },

  deletePostRoute: (req, res) => {
    Post.find({})
      .select({})
      .exec(function (err, result) {
        res.render("delete", {
          posts: result,
        });
      });
  },

  deletePost: (req, res) => {
    Post.deleteOne({ title: req.body.title }, function (err) {
      if (err) return handleError(err);
    });
    res.redirect("/posts/delete");
  },

  displayPost: (req, res) => {
    Post.find({})
      .select({})
      .exec(function (err, result) {
        res.render("post", {
          posts: result,
          params: req.params,
          markdown: markdown,
        });
      });
  },

  displayIndex: (req, res) => {
    Post.find({})
      .select({})
      .exec(function (err, result) {
        res.render("index", {
          posts: result,
        });
      });
  },
};
