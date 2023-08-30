const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require('../models/user.cjs')

//create a token
function createJWT(user){
    return jwt.sign(
        {user},
        process.env.SECRET,
        {expiresIn: '24h'}
        )    
}
    
function checkToken(req, res) {
    console.log('req.user', req.user)
    res.json(req.exp)
}

//********************************************CRUD********************************************//
const dataController ={
    //C
          async createUser (req,res,next){
        try {
            const user = await User.create(req.body)
            const token = createJWT(user)
            console.log(user)
            req.user = user
            res.locals.data.user = user
            res.locals.data.token = token
            console.log('----res.locals.data.user-----',res.locals.data.user)
            console.log('----res.locals.data.token-----',res.locals.data.token)
            res.json(token)
            next()
        } catch (error) {
            console.log('Ya gatta database prablem son')
            req.status(400).json({error:error.message})
        }
    },
    
    //R
        async getUser(req,res,next){
        try {
            const foundUser =  await User.findOne({_id:req.params.id})
            res.json(foundUser)
            next()
        } catch (error) {
            req.status(400).json({error:error.message})
            
        }
    },
    
    
        async loginUser (req,res,next){
        try {
            const user = await User.findOne({email:req.body.email})
            if(!user) throw Error()
            const match = await bcrypt.compare(req.body.password, user.password)
            if(!match) throw new Error()
            res.locals.data.user = user
            res.locals.data.token = createJWT(user)
            console.log('----res.locals.data.user-----',res.locals.data.user)
            console.log('----res.locals.data.token-----',res.locals.data.token)
            next()
        } catch (error) {
            res.status(400).json('Bad Credentials')
        }
    },
    
    //U
        async updateUser(req,res,next) {
        try {
            const updatedUser = await User.findOneAndUpdate({_id:req.params.id},req.body,{new:true})
            updatedUser.save()
            res.json(updatedUser)
            res.locals.data.user = updatedUser
            res.locals.data.user = req.user.token 
            next()
        } catch (error) {
            res.status(400).json('Bad Credentials')
            
        }
    },
    
    //D
    async deleteUser (req,res,next){
        try {
            console.log('---- req.locals.data.token --- ', req.locals.data.user)
            const findUser = await User.findOne({_id:req.params.id})
            console.log('---- findUser.id ---- ', findUser.id)
            if(findUser.id !== req.locals.data.user._id){
                res.json('You are not Authorized to delete this account')
            } else if(findUser.id=== req.locals.data.user._id){
                await User.deleteOne({_id:req.params.id})
                req.user = null
                req.locals.data.user = null
                req.locals.data.token = null
                res.json('User Deleted')
                next()
            }
        } catch (error) {
            res.status(400).json('Bad Credentials')
            
        }
    }
    }
    
    
    module.exports = {
        checkToken,
        dataController,
        apiController
    }