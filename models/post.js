const mongoose = require("mongoose");
const slug = require("slug");

const blogPostSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, default: "Kielx" },
  added: { type: Date, default: Date.now },
  content: String,
});

blogPostSchema.virtual("newSlug").get(function () {
  return slug(this.title, "_");
});
module.exports = mongoose.model("Post", blogPostSchema);
