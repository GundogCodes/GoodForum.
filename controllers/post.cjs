const Forum = require('../models/forums.cjs')
const Post = require('../models/post.cjs')
const User = require('../models/user.cjs')
//fully CRUDable right

//Create a post
exports.createPost = async (req,res) =>{
    try {
        if(!req.user){
            res.json('Please login to continue')
        } else{

            const forum = Forum.findOne({_id:req.body.id})
            const newPost = Post.create(req.body)
            newPost.sender = req.user
            newPost.forum =  forum
            await Forum.updateOne({_id:req.params.id,
                $push:{posts:newPost}})
                await User.findOneAndUpdate({_id:req.user.id}, {$inc:{numOfPosts:1}, $push:{posts:newPost}},{new:true})
                res.json(newPost)
            }
    } catch (error) {
        
        res.status(400).json({error: error.message})
    }
}

//Read a post
exports.getPost = async function(req,res){
    try {
        const returnedPost  = await Post.findOne({_id:req.params.id})
        res.json(returnedPost)
    } catch (error) {
        
        res.status(400).json({error: error.message})
    }
}

//Update a post
exports.updatePost = async function(req,res){
    try {
        if(!req.user){
            res.json('Please login to continue')
        }else{
            const checkPost = await Post.findOne({_id:req.params.id})
            if(checkPost.sender === req.user){

                const updatedPost =  await Post.findOneAndUpdate({_id:req.params.id}, req.body, {new:true})
                res.json(updatedPost)
            } else{
                res.json('You are not authorized to edit this post')
            }
        }
    } catch (error) {
        
        res.status(400).json({error: error.message})
    }
}

//Delete a Post
exports.deletePost = async (req,res) =>{
    try {
        if(!req.user){
            res.json('Please login to continue')
        }else{
            const checkPost = await Post.findOne({_id:req.params.id})
            if(checkPost.sender === req.user){

                await Post.findOneAndDelete({_id:req.params.id})
                res.json('Post Deleted')
            } else{
                res.json('You are not authorized to edit this post')
            }
        }
    } catch (error) {
        res.status(400).json({error: error.message})
        
    }
}