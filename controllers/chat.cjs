const Chat = require('../models/chat.cjs')
const User = require('../models/user.cjs')
//create a chat

exports.createChat = async (req,res)=>{
    try {
        const user = await User.findOne({_id:req.user._id})
        const friend = await User.findOne({_id:req.params.id})
        const aNewChat = {}
        aNewChat.chatName = user._id.slice(0,4) +friend._id.slice(0,4)
        aNewChat.isGroupChat = true
        aNewChat.users = []
        aNewChat.users.push(user)
        aNewChat.users.push(friend)
        aNewChat.groupAdmin = user
        const newChat = await Chat.create(aNewChat)
        .populate('users')
        .populate('groupAdmin')
        res.json(newChat)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

//get chat
exports.getChat = async (req,res)=>{
    try {
        const chat = await Chat.findOne({_id:req.params.id})
        .populate('users')
        .populate('groupAdmin')
        res.json(chat)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}
//delete chat

exports.deleteChat = async (req,res)=>{
    try {
        const chat = await Chat.findOneAndDelete({_id:params.id})
        if(!chat){
            res.json('chat does not exist')
        } else{
            res.json('chat deleted')
            
        }
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}