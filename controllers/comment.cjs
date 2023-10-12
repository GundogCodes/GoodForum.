const User = require('../models/user.cjs')
const Post = require('../models/post.cjs')
const Comment = require('../models/comment.cjs')
exports.addComment = async (req,res)=>{
    try {

    } catch (error) {
        
        res.status(400).json({error: error.message})
    }
}

exports.deleteComment = async (req,res)=>{
    try {

    } catch (error) {
        
        res.status(400).json({error: error.message})
    }
}
exports.editComment = async (req,res)=>{
    try {
    } catch (error) {
        
        res.status(400).json({error: error.message})
    }
}


exports.showAComment = async (req,res)=>{
    try {
        
    } catch (error) {
        res.status(400).json({error: error.message})
        
    }
}