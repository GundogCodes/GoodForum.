const User = require('../models/user.cjs')
const Post = require('../models/post.cjs')
const Comment = require('../models/comment.cjs')
exports.addComment = async (req,res)=>{
    try {
        const commentingUser = await User.findOne({'_id':req.user.id})
        const findPost = await Post.findOne({_id:req.params.id})
        const newComment = await Comment.create(req.body)
        newComment.sender = commentingUser
        findPost.comments.addToSet(newComment)
        res.json(findPost)
    } catch (error) {
        
        res.status(400).json({error: error.message})
    }
}

exports.deleteComment = async (req,res)=>{
    try {
        await Comment.findOneAndDelete({_id:req.params.id})
        res.json('comment deleted')
    } catch (error) {
        
        res.status(400).json({error: error.message})
    }
}
exports.editComment = async (req,res)=>{
    try {
        const updatedComment = await Comment.findOneAndUpdate({_id:req.params.id},req.body, {new:true})
        
        res.json(updatedComment)
    } catch (error) {
        
        res.status(400).json({error: error.message})
    }
}


exports.showAComment = async (req,res)=>{
    try {
        const comment = await Comment.findOne({_id:req.params.id})
        res.json(comment)
    } catch (error) {
        res.status(400).json({error: error.message})
        
    }
}