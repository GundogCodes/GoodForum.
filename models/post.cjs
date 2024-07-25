const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const postSchema = new mongoose.Schema(
  {
    title: { type: String, maxlength: 15, require: true },
    forum: { type: mongoose.Schema.ObjectId, ref: "Forum", require: true },
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      require: true,
    },
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
    likes: {
      type: Number,
      default: 0,
      validate: {
        validator: function (v) {
          return v >= 0;
        },
        message: (props) =>
          `${props.value} is not a valid number of likes! Likes cannot be negative.`,
      },
    },
    dislikes: {
      type: Number,
      default: 0,
      validate: {
        validator: function (v) {
          return v >= 0;
        },
        message: (props) =>
          `${props.value} is not a valid number of dislikes! Dislikes cannot be negative.`,
      },
    },
    edited: { type: Boolean, default: false },
    image: { type: String, default: "" },
    text: { type: String, default: "" },
    link: { type: String, default: "" },
    video: { type: String, default: "" },
  },
  {
    timestamps: true,
  }
);

postSchema.methods.incrementLikes = async function (postId) {
  this.likes = this.likes + 1;
  return this.save();
};

postSchema.methods.incrementDislikes = async function (postId) {
  this.dislikes = this.dislikes + 1;
  return this.save();
};
/*
postSchema.pre('save', async function(next){
    this.text = await bcrypt.hash(this.text,8)
    null;
    next()
})

*/

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
