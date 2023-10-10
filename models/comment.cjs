const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
    text:{type:String},
    sender:{type:mongoose.Schema.Types.ObjectId, ref:'User'}

},{timestamps:true})

const Comment = mongoose.model('Comment',commentSchema)

module.exports = Comment