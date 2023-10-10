const Forum = require('../models/forums.cjs')
const Post = require('../models/post.cjs')
const User = require('../models/user.cjs')
//fully CRUDable right

//Create a post

exports.createPost = async (req,res) =>{
    try {
        const postingUser = await User.findOne({'_id':req.user.id})
        const newPost = await Post.create(req.body)
        newPost.sender = postingUser
        const newPostForum = await Forum.findOne({_id:req.params.id})
        newPostForum.posts.addToSet(newPost)
    } catch (error) {
        
        res.status(400).json({error: error.message})
    }
}

//Read a post

exports.getPost = async function(req,res){
    try {
        const post = await Post.findOne({_id:req.params.id})
        res.json(post)
    } catch (error) {
        
        res.status(400).json({error: error.message})
    }
}

//Update a post

//Delete a Post

exports.deletePost = async (req,res) =>{
    try {
        const user = User.findOne({_id:req.user.id})
        const post = Post.findOne({_id:req.params.id})
        if(user.id === post.sender._id){
            Post.deleteOne({_id:req.params.id})
            res.json('Post Deleted')
        } else{
            res.json('Not Authorized to delete this Post')
        }
    } catch (error) {
        res.status(400).json({error: error.message})
        
    }
}