const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
    text:{type:String, require:true},
    edited:{type:Boolean, default:false},
    sender:{type:mongoose.Schema.Types.ObjectId, ref:'User', require:true}

},{timestamps:true})

const Comment = mongoose.model('Comment',commentSchema)

module.exports = Comment