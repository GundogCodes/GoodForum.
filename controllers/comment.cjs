const User = require('../models/user.cjs')
const Post = require('../models/post.cjs')
const Comment = require('../models/comment.cjs')

exports.deleteComment = async (req,res)=>{
    try {
        if(!req.user){
            res.json('please login to continue')
        } else{
            const checkCommentSender = await Comment.findOne({_id:req.params.id}).populate('sender')
            if(req.user.email !== checkCommentSender.sender.email){
                res.json('You are not Authorized to delete this comment')
            }else{
                await Comment.findOneAndDelete({_id:req.params.id})
                res.json('Comment Deleted')
            }
        }
    } catch (error) {
        
        res.status(400).json({error: error.message})
    }
}
exports.editComment = async (req,res)=>{
    try {
        if(!req.user){
            res.json('please login to continue')
        } else{
            const checkCommentSender = await Comment.findOne({_id:req.params.id}).populate('sender')
            if(req.user.email !== checkCommentSender.sender.email){
                res.json('You are not Authorized to edit this comment')
            }else{
                const updatedComment = await Comment.findOneAndUpdate({_id:req.params.id}, req.body, {new:true})
                res.json(updatedComment)
            }
        }
    } catch (error) {
        
        res.status(400).json({error: error.message})
    }
}

exports.showComment = async (req,res)=>{
    try {
        const comment = await Comment.findOne({_id:req.params.id})
        res.json(comment)
    } catch (error) {
        res.status(400).json({error: error.message})
        
    }
}
