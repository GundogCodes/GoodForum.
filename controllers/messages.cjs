require('dotenv').config()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Message = require('../models/mesages.cjs')
const User = require('../models/user.cjs')


exports.sendPrivateMessage = async (req,res) => {
    try {
        
            //req.user.id !== req.params.id
            const sendingUser = await User.findOne({'_id':req.user.id})
            const receivingUser =  await User.findOne({'_id':req.params.id})
            req.body.sender = sendingUser.username
            req.body.receiver = receivingUser.username
            const message = await pMessages.create(req.body)
            if(!message.text){
        
                res.json(" Include a 'text' key in your message")
               
            } else{

                for(let i=0; i<=sendingUser.interactions.length; i++){
                    if (sendingUser.interactions[i] !== sendingUser.username){
                        sendingUser.interactions.addToSet(receivingUser.username)
                        
                        sendingUser.chats.addToSet(message)
                    } else{
                        sendingUser.chats.addToSet(message)
                    }
                }
                
                for(let i=0; i<=receivingUser.interactions.length; i++){
                    if (receivingUser.interactions[i] !== receivingUser.username){
                        receivingUser.interactions.addToSet(sendingUser.username)
                        
                        receivingUser.chats.addToSet(message)
                    } else{
                        receivingUser.chats.addToSet(message)
                    }
                }
                
                receivingUser.interactions.addToSet(sendingUser.username)
                
                await sendingUser.save()
                await receivingUser.save()
                
                // console.log('SU after',sendingUser)
                //console.log('RU after', receivingUser)
                res.json(message)//sendingUser.chats)
                
            }
    
    } catch (error) {
        res.json({message:error.message})
    }
}

exports.seeChats  = async (req,res)=>{
    try {

        if(req.params.id === req.user.id){
            
            const foundUser = await User.findOne({'_id':req.user._id}).populate('chats')
            const chats = foundUser.chats
            const user = foundUser.username +"'s Chats:"
            res.json({user,chats})

        
        } else if(req.params.id !== req.user.id){
            res.json({message:'Not Authorized to see these chats, please login',goToProfile:`yourProfile/users/${req.user.id}`})
        
        } 
    } catch (error) {
        res.status(400).json({message:error.message})
    }
}

exports.deleteMessage = async (req,res)=>{
    //add functionality that deletes the message from both users chats list as well
    try {
        const deletingMessage = await pMessages.findOne({'_id':req.params.id})
        const user = await User.findOne({'_id':req.user.id})
       // console.log(deletingMessage)
        if(deletingMessage.sender === user.username){
            await pMessages.findOneAndDelete({'_id':req.params.id})
            res.json({message:'message deleted',goToProfile:`yourProfile/users/${user.id}`})
        } else if(deletingMessage.sender !== user.username){
            res.json({message:'Not Authorized to see these chats, please login',goToProfile:`yourProfile/users/${user.id}`})
        }
    } catch (error) {
        res.status(400).json({message:error.message})
    }
}

exports.editMessage = async (req,res)=>{
    try {
        const updatingMessage = await pMessages.findOne({'_id':req.params.id})
        const user = await User.findOne({'_id':req.user.id})
        console.log(updatingMessage)
        if(updatingMessage.sender === user.username){
            const editedMessage = await pMessages.findByIdAndUpdate({'_id':req.params.id}, req.body, {new:true})
            res.json({message:'message updated',editedMessage:editedMessage,goToProfile:`yourProfile/users/${user.id}`})
        } else if(updatingMessage.sender !== user.username){
            res.json({message:'Not Authorized to see these chats, please login',goToProfile:`yourProfile/users/${user.id}`})
        }
    } catch (error) {
        res.status(400).json({message:error.message})
    }
}

