const Forum = require('../models/forums.cjs')
const Post = require('../models/post.cjs')
const User = require('../models/user.cjs')
//fully CRUDable right

//Create a post
exports.createPost = async (req,res) =>{
    try {


    } catch (error) {
        
        res.status(400).json({error: error.message})
    }
}

//Read a post
exports.getPost = async function(req,res){
    try {

    } catch (error) {
        
        res.status(400).json({error: error.message})
    }
}

//Update a post
exports.updatePost = async function(req,res){
    try {
    } catch (error) {
        
        res.status(400).json({error: error.message})
    }
}

//Delete a Post
exports.deletePost = async (req,res) =>{
    try {
        
    } catch (error) {
        res.status(400).json({error: error.message})
        
    }
}