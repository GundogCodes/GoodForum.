const Forum = require("../models/forums.cjs");
const Post = require("../models/post.cjs");
const User = require("../models/user.cjs");
const Comment = require("../models/comment.cjs");
//fully CRUDable right

//Create a post
exports.createPost = async (req, res) => {
  try {
    if (!req.user) {
      res.json("Please login to continue");
    } else {
      const postingForum = await Forum.findOne({ _id: req.body.id });
      const newPost = {};
      newPost.sender = req.user;
      newPost.forum = postingForum;
      newPost.content = req.body.content;
      const createdPost = await Post.create(newPost);
      const updatedForum = await Forum.findOneAndUpdate(
        { _id: req.body.id },
        { $addToSet: { posts: createdPost } },
        { new: true }
      ).populate("posts");

      const updatedUser = await User.findOneAndUpdate(
        { _id: req.user._id },
        { $inc: { numOfPosts: 1 }, $push: { posts: createdPost } },
        { new: true }
      )
        .populate("friends")
        .populate("followedForums")
        .populate("posts")
        .populate("chats");
      res.json({ updatedForum: updatedForum, updatedUser: updatedUser });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//Read a post
exports.getPost = async function (req, res) {
  try {
    const returnedPost = await Post.findOne({ _id: req.params.id })
      .populate("comments")
      .populate("sender")
      .populate("forum");
    if (!returnedPost) {
      res.json("Post not found");
    } else {
      res.json(returnedPost);
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
//get all of a user's posts
exports.getAllUserPosts = async function (req, res) {
  try {
    const returnedPosts = await Post.find({
      sender: req.params.userId,
    }).populate("forum");

    if (!returnedPosts || returnedPosts.length === 0) {
      res.status(404).json({ message: "Posts not found" });
    } else {
      res.json(returnedPosts);
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//Update a post
exports.updatePost = async function (req, res) {
  try {
    if (!req.user) {
      res.json("Please login to continue");
    } else {
      const checkPost = await Post.findOne({ _id: req.params.id }).populate(
        "sender"
      );
      console.log("checkPost.sender ", checkPost);
      console.log("req.user ", req.user.email);
      if (checkPost.sender.email === req.user.email) {
        const updatedPost = await Post.findOneAndUpdate(
          { _id: req.params.id },
          req.body,
          { new: true }
        );
        await Post.findOneAndUpdate(
          { _id: req.params.id },
          { $set: { edited: true } },
          { new: true }
        );

        res.json(updatedPost);
      } else {
        res.json("You are not authorized to edit this post");
      }
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
//incrementLikes
exports.incrementLikes = async function (req, res) {
  console.log("RUI: ", req.user._id);
  try {
    const updatedPost = await Post.findOneAndUpdate(
      { _id: req.params.id },
      { $inc: { likes: 1 } },
      { new: true }
    )
      .populate("comments")
      .populate("sender")
      .populate("forum");
    const updatedUser = await User.findOneAndUpdate(
      { _id: req.user._id },
      { $addToSet: { likedPosts: updatedPost } },
      { new: true }
    )
      .populate("friends")
      .populate("followedForums")
      .populate("foundedForums")
      .populate("posts")
      .populate("chats");
    res.json({ updatedPost: updatedPost, updatedUser: updatedUser });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
exports.decrementLikes = async function (req, res) {
  try {
    // Find the post by ID first
    const post = await Post.findById(req.params.id);

    // If the post has likes greater than 0, decrement it
    if (post.likes > 0) {
      const updatedPost = await Post.findOneAndUpdate(
        { _id: req.params.id },
        { $inc: { likes: -1 } },
        { new: true }
      )
        .populate("comments")
        .populate("sender")
        .populate("forum");

      const updatedUser = await User.findOneAndUpdate(
        { _id: req.user._id },
        { $pull: { likedPosts: updatedPost._id } },
        { new: true }
      )
        .populate("friends")
        .populate("followedForums")
        .populate("foundedForums")
        .populate("posts")
        .populate("chats");

      res.json({ updatedPost: updatedPost, updatedUser: updatedUser });
    } else {
      // If likes are already 0, just return the current state of the post and user
      const updatedPost = await Post.findById(req.params.id)
        .populate("comments")
        .populate("sender")
        .populate("forum");

      const updatedUser = await User.findById(req.user._id)
        .populate("friends")
        .populate("followedForums")
        .populate("foundedForums")
        .populate("posts")
        .populate("chats");

      res.json({ updatedPost: updatedPost, updatedUser: updatedUser });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
//incrementDislikes
exports.incrementDislikes = async function (req, res) {
  try {
    const updatedPost = await Post.findOneAndUpdate(
      { _id: req.params.id },
      { $inc: { dislikes: 1 } },
      { new: true }
    )
      .populate("comments")
      .populate("sender")
      .populate("forum");
    const updatedUser = await User.findOneAndUpdate(
      { _id: req.user._id },
      { $push: { dislikedPosts: updatedPost } },
      { new: true }
    )
      .populate("friends")
      .populate("followedForums")
      .populate("foundedForums")
      .populate("posts")
      .populate("chats");
    res.json({ updatedPost: updatedPost, updatedUser: updatedUser });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
exports.decrementDislikes = async function (req, res) {
  try {
    // Find the post by ID first
    const post = await Post.findById(req.params.id);

    // If the post has dislikes greater than 0, decrement it
    if (post.dislikes > 0) {
      const updatedPost = await Post.findOneAndUpdate(
        { _id: req.params.id },
        { $inc: { dislikes: -1 } },
        { new: true }
      )
        .populate("comments")
        .populate("sender")
        .populate("forum");

      const updatedUser = await User.findOneAndUpdate(
        { _id: req.user._id },
        { $pull: { dislikedPosts: updatedPost._id } },
        { new: true }
      )
        .populate("friends")
        .populate("followedForums")
        .populate("foundedForums")
        .populate("posts")
        .populate("chats");

      res.json({ updatedPost: updatedPost, updatedUser: updatedUser });
    } else {
      // If dislikes are already 0, just return the current state of the post and user
      const updatedPost = await Post.findById(req.params.id)
        .populate("comments")
        .populate("sender")
        .populate("forum");

      const updatedUser = await User.findById(req.user._id)
        .populate("friends")
        .populate("followedForums")
        .populate("foundedForums")
        .populate("posts")
        .populate("chats");

      res.json({ updatedPost: updatedPost, updatedUser: updatedUser });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
//Delete a Post
exports.deletePost = async (req, res) => {
  try {
    if (!req.user) {
      res.json("Please login to continue");
    } else {
      const checkPost = await Post.findOne({ _id: req.params.id }).populate(
        "sender"
      );
      console.log("checkPost.sender ", checkPost);
      console.log("req.user ", req.user.email);
      if (checkPost.sender.email === req.user.email) {
        await User.findOneAndUpdate(
          { _id: req.user._id },
          { $pull: { posts: req.params.id }, $inc: { numOfPosts: -1 } },
          { new: true }
        );

        await Forum.findOneAndUpdate(
          { _id: checkPost.forum },
          { $pull: { posts: req.params.id }, $inc: { numOfPosts: -1 } },
          { new: true }
        );

        await Post.findOneAndDelete({ _id: req.params.id });
        res.json("Post Deleted");
      } else {
        res.json("You are not authorized to edit this post");
      }
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
exports.commentToPost = async (req, res) => {
  try {
    if (!req.user) {
      res.json("please login to continue");
    } else {
      const newComment = {};
      newComment.sender = req.user;
      newComment.text = req.body.text;
      const createComment = await Comment.create(newComment);
      const updatedPost = await Post.findOneAndUpdate(
        { _id: req.params.id },
        { $push: { comments: createComment } },
        { new: true }
      )
        .populate("comments")
        .populate("sender")
        .populate("forum");
      const senders = updatedPost.comments.map((comment) => ({
        sender: comment.sender,
        text: comment.text,
      }));
      res.json({ updatedPost, senders });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAllPosts = async (req, res) => {
  try {
    const allPosts = await Post.find({})
      .populate("sender")
      .populate("forum")
      .populate("comments")
      .sort({ createdAt: -1 })
      .exec();
    res.json(allPosts);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
