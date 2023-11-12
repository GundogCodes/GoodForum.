require('dotenv').config()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/user.cjs')
const Message = require('../models/message.cjs')

//send Message
exports.sendMessage = async (req,res)=>{
    try {
        const aNewMessage = {}
        aNewMessage.sender = req.user
        aNewMessage.content = req.content
        aNewMessage.chat = req.params.id
        const newMessage = await Message.create(aNewMessage)
        res.json(newMessage)
    } catch (error) {
        res.status(400).json({ message: error.message })
        
    }
}
