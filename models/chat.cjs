const {model,Schema, default: mongoose} = require('mongoose')

const chatSchema = new Schema({

    chatName:{type:String, trim:true, require:true},
    isGroupChat:{type:Boolean, default:false},
    users:[{type:mongoose.Schema.Types.ObjectId, ref:'User'}],
    latestMessage:{type:mongoose.Schema.Types.ObjectId, ref:'Message'},
    groupAdmin:{type:mongoose.Schema.Types.ObjectId, ref:'User'}

}, {
    timestamps:true
})


// privateMessageSchema.pre('save', async function(next){
//     this.text = await bcrypt.hash(this.text,8)
//     null;
//     next()
// })



const Chat = model('Chat', chatSchema)

module.exports = Chat