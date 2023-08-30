const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
    post:{type:mongoose.Schema.Types.ObjectId, ref:'Post'},
    text:{type:String},
    commenter:{type:mongoose.Schema.Types.ObjectId, ref:'User'}

},{timestamps:true})

const Comment = mongoose.model('Comment',commentSchema)

module.exports = Comment