const {model,Schema} = require('mongoose')
const bcrypt = require('bcrypt')

const messageSchema = new Schema({
    
    text:{type:String},

    sender:{type:String, required:true},
    
    receiver:{type:String, required:true}

}, {
    timestamps:true
})


// privateMessageSchema.pre('save', async function(next){
//     this.text = await bcrypt.hash(this.text,8)
//     null;
//     next()
// })



const Message = model('privateMessage', messageSchema)

module.exports = Message