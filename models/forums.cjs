const mongoose = require("mongoose");

const forumSchema = new mongoose.Schema({
  founder: { type: mongoose.Schema.Types.ObjectId, ref: "User", require: true },
  title: { type: String, maxlength: 50, require: true },
  topic: { type: String, maxlength: 50, require: true },
  description: { type: String, maxlength: 100, require: true },
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  numOfMembers: { type: Number, default: 0 },
  posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
});

const Forum = mongoose.model("Forum", forumSchema);

module.exports = Forum;
