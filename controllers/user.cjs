const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/user.cjs");
const Post = require("../models/post.cjs");
const Forum = require("../models/forums.cjs");
const Chat = require("../models/chat.cjs");

//function to create a token using JWT
function createJWT(user) {
  return jwt.sign({ user }, process.env.SECRET, { expiresIn: "24h" });
}

//checkToken function which responds with the expiry of the the token
function checkToken(req, res) {
  console.log("req.exp", req.exp);
  res.json(req.exp);
}

//authencationn function which returns the local token
const apiController = {
  auth(req, res) {
    res.json(res.locals.data.token);
  },
};
//********************************************CRUD********************************************//
const dataController = {
  //C
  async createUser(req, res, next) {
    try {
      const user = await User.create(req.body);
      //user.populate("friends").populate("followedForums").populate("posts");
      const token = createJWT(user);
      console.log(user);
      req.user = user;
      res.locals.data.user = user;
      res.locals.data.token = token;
      console.log("----res.locals.data.user-----", res.locals.data.user);
      console.log("----res.locals.data.token-----", res.locals.data.token);
      res.json(token);
    } catch (error) {
      res.status(400).json({ error: error.message });
      console.log("Ya gatta database prablem son");
    }
  },

  //R
  async getUser(req, res, next) {
    try {
      const foundUser = await User.findOne({ _id: req.params.id })
        .populate("friends")
        .populate("followedForums")
        .populate("posts")
        .populate("chats");
      if (foundUser) {
        res.json(foundUser);
      } else {
        res.status(200).json("User not found");
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async loginUser(req, res, next) {
    try {
      const user = await User.findOne({ email: req.body.email })
        .populate("friends")
        .populate("followedForums")
        .populate("posts")
        .populate("chats");
      if (!user) throw Error();
      const match = await bcrypt.compare(req.body.password, user.password);
      if (!match) throw new Error();
      req.user = user;
      res.locals.data.user = user;
      const token = createJWT(user);
      res.locals.data.token = token;
      console.log("----res.locals.data.user-----", res.locals.data.user);
      console.log("----res.locals.data.token-----", res.locals.data.token);
      res.status(200).json(token);
    } catch (error) {
      res.status(400).json("Bad Credentials");
    }
  },

  //U
  async updateUser(req, res, next) {
    try {
      const updatedUser = await User.findOneAndUpdate(
        { _id: req.params.id },
        req.body,
        { new: true }
      )
        .populate("friends")
        .populate("followedForums")
        .populate("posts")
        .populate("chats");
      res.json(updatedUser);
      res.locals.data.user = updatedUser;
      res.locals.data.user = req.user.token;
      next();
    } catch (error) {
      res.status(400).json("Bad Credentials");
    }
  },

  //D
  async deleteUser(req, res, next) {
    try {
      const findUser = await User.findOne({ _id: req.params.id });
      console.log(findUser);
      console.log("findUser.email", findUser.email);
      console.log("req.body", req.body.email);
      console.log(
        "request password: ",
        req.body.password,
        " database userPass",
        findUser.password
      );
      //   const match = await bcrypt.compare(req.body.password, findUser.password);
      //   console.log(match);
      if (
        findUser.email !== req.body.email ||
        findUser.password !== req.body.password
      ) {
        res.json("Password is incorrect or not Authorized");
      } else if (
        findUser.email === req.body.email &&
        findUser.password === req.body.password
      ) {
        await User.deleteOne(findUser);
        res.json("userDeleted");
      }
    } catch (error) {
      res.status(400).json("Bad Credentials");
    }
  },
  async getAllUsers(req, res) {
    try {
      const users = await User.find({})
        .populate("friends")
        .populate("followedForums")
        .populate("posts")
        .populate("chats");
      res.json(users);
    } catch (error) {
      res.status(400).json(error);
    }
  },
  async getUserPosts(req, res) {
    try {
      //console.log('hehe',req.user)
      const userPosts = await Post.find({ sender: req.user._id })
        .populate("forum")
        .populate("comments");
      if (userPosts.length !== 0) {
        res.json(userPosts);
      } else {
        res.json("no posts");
      }
    } catch (error) {
      res.status(400).json(error);
    }
  },
  async getUserFollowedForums(req, res) {
    try {
      const userForums = await Forum.find({ members: req.user });
      console.log();
    } catch (error) {
      res.status(400).json(error);
    }
  },
  async addFriend(req, res) {
    try {
      const user = await User.findOne({ _id: req.user._id });
      const friend = await User.findOne({ _id: req.params.id });
      //if chat already exits dont create a new one, if it doesnt then create on
      const potChatName1 = user._id + friend._id;
      const isChat1 = await Chat.findOne({ chatName: potChatName1 });
      const potChatName2 = friend._id + user._id;
      const isChat2 = await Chat.findOne({ chatName: potChatName2 });
      if (isChat1) {
        res.json(isChat1);
      } else if (isChat2) {
        res.json(isChat2);
      } else {
        //create a chat and add the chats to the users chat arrays
        const aNewChat = {};
        aNewChat.chatName = user._id + friend._id;
        aNewChat.isGroupChat = true;
        aNewChat.users = [];
        aNewChat.users.push(user);
        aNewChat.users.push(friend);
        aNewChat.groupAdmin = user;
        const newChat = await Chat.create(aNewChat);
        //update Users friends list include other user
        const updatedFriend = await User.findOneAndUpdate(
          { _id: friend._id },
          {
            $addToSet: { friends: user, chats: newChat },
          },
          { new: true }
        )
          .populate("friends")
          .populate("followedForums")
          .populate("posts")
          .populate("chats");
        const updatedUser = await User.findOneAndUpdate(
          { _id: user._id },
          {
            $addToSet: { friends: updatedFriend, chats: newChat },
          },
          { new: true }
        )
          .populate("friends")
          .populate("followedForums")
          .populate("posts")
          .populate("chats");

        //return updatedUser
        res.json(updatedUser);
      }
    } catch (error) {
      res.status(400).json(error);
    }
  },
  async removeFriend(req, res) {
    try {
      const removingFriend = await User.findOne({ _id: req.params.id });
      if (!req.user) {
        res.json("Login to continue");
      }
      if (!removingFriend) {
        return res.status(404).json({ error: "Friend not found" });
      } else {
        await User.findByIdAndUpdate(
          { _id: removingFriend._id },
          { $pull: { friends: req.user._id } },
          { new: true }
        );

        const updatedUser = await User.findByIdAndUpdate(
          { _id: req.user._id },
          { $pull: { friends: removingFriend._id } },
          { new: true }
        )
          .populate("friends")
          .populate("followedForums")
          .populate("posts")
          .populate("chats");
        res.json(updatedUser);
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
};

module.exports = {
  checkToken,
  dataController,
  apiController,
};
