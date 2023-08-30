const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const postSchema = new mongoose.Schema({
    
    text:{type:String},

    sender:{type: mongoose.Schema.Types.ObjectId, ref:'User', require:true},

    comments:[{type:mongoose.Schema.Types.ObjectId, ref:'Comment'}]

}, {
    timestamps:true
})

/*
postSchema.pre('save', async function(next){
    this.text = await bcrypt.hash(this.text,8)
    null;
    next()
})

*/

const Post = mongoose.model('Post', postSchema)

module.exports = Post