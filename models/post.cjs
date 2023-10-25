const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const postSchema = new mongoose.Schema({
    title:{type:String, require:true},
    content:{type:String, require:true}, // string for now
    forum:{type:mongoose.Schema.ObjectId, ref:'Forum', require:true},
    sender:{type: mongoose.Schema.Types.ObjectId, ref:'User', require:true},
    comments:[{type:mongoose.Schema.Types.ObjectId, ref:'Comment'}],
    likes:{type:Number, default:0},
    dislikes:{type:Number, default:0},
    edited:{type:Boolean, default:false},
    image:{type:String},
    link:{type:String},
    video:{type:String}
    
}, {
    timestamps:true
})

postSchema.methods.incrementLikes = async function(postId){
    this.likes = this.likes +1
    return this.save()
}

postSchema.methods.incrementDislikes = async function(postId){
    this.dislikes = this.dislikes +1
    return this.save()
}
/*
postSchema.pre('save', async function(next){
    this.text = await bcrypt.hash(this.text,8)
    null;
    next()
})

*/

const Post = mongoose.model('Post', postSchema)

module.exports = Post