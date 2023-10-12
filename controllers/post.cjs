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

            const postingForum = await  Forum.findOne({_id:req.body.id})
            const newPost =  {}
            newPost.sender = req.user
            newPost.forum =  postingForum
            newPost.content = req.body.content
            const createdPost = await Post.create(newPost)
             await Forum.findOneAndUpdate({_id:req.body.id},{$push:{posts:createdPost}},{new:true})
             await User.findOneAndUpdate({_id:req.user._id}, {$inc:{numOfPosts:1}, $push:{posts:createdPost}},{new:true})
                res.json(createdPost)
            }
    } catch (error) {
        
        res.status(400).json({error: error.message})
    }
}

//Read a post
exports.getPost = async function(req,res){
    try {
        const returnedPost  = await Post.findOne({_id:req.params.id})
        if(!returnedPost){
            res.json('Post does not exist')
        }else{

            res.json(returnedPost)
        }
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
            const checkPost = await Post.findOne({_id:req.params.id}).populate('sender')
            console.log('checkPost.sender ',checkPost)
            console.log('req.user ',req.user.email)
            if(checkPost.sender.email === req.user.email){
                const updatedPost =  await Post.findOneAndUpdate({_id:req.params.id}, req.body, {new:true})
                await Post.findOneAndUpdate({_id:req.params.id}, {$set:{edited:true}}, {new:true})
                
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
            const checkPost = await Post.findOne({_id:req.params.id}).populate('sender')
            console.log('checkPost.sender ',checkPost)
            console.log('req.user ',req.user.email)
            if(checkPost.sender.email === req.user.email){
                await User.findOneAndUpdate({_id:req.user._id}, {$pull:{posts:req.params.id}, $inc:{numOfPosts:-1}}, {new:true})
                await Forum.findOneAndUpdate({_id:checkPost.forum},{$pull:{posts:req.params.id}, $inc:{numOfPosts:-1}},{new:true})
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