const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require('../models/user.cjs')


//function to create a token using JWT
function createJWT(user) {
    return jwt.sign(
        { user },
        process.env.SECRET,
        { expiresIn: '24h' }
    )
}

//checkToken function which responds with the expiry of the the token
function checkToken(req, res) {
    console.log('req.exp', req.exp)
    res.json(req.exp)
}

//authencationn function which returns the local token
const apiController = {
    auth(req, res) {
        res.json(res.locals.data.token)
    }
}
//********************************************CRUD********************************************//
const dataController = {
    //C
    async createUser(req, res, next) {
        try {
            const user = await User.create(req.body)
            const token = createJWT(user)
            console.log(user)
            req.user = user
            res.locals.data.user = user
            res.locals.data.token = token
            console.log('----res.locals.data.user-----', res.locals.data.user)
            console.log('----res.locals.data.token-----', res.locals.data.token)
            res.json(token)
        } catch (error) {
            res.status(400).json({ error: error.message })
            console.log('Ya gatta database prablem son')
        }
    },

    //R
    async getUser(req, res, next) {
        try {
            const foundUser = await User.findOne({ _id: req.params.id })
            if (!foundUser) {
                res.status(200).json('user does not exist')
            } else {

                res.status(200).json(foundUser)
            }


        } catch (error) {
            res.status(400).json({ error: error.message })

        }
    },


    async loginUser(req, res, next) {
        try {
            const user = await User.findOne({ email: req.body.email })
            if (!user) throw Error()
            const match = await bcrypt.compare(req.body.password, user.password)
            if (!match) throw new Error()
            req.user = user
            res.locals.data.user = user
            const token = createJWT(user)
            res.locals.data.token = token
            console.log('----res.locals.data.user-----', res.locals.data.user)
            console.log('----res.locals.data.token-----', res.locals.data.token)
            res.status(200).json(token)
        } catch (error) {
            res.status(400).json('Bad Credentials')
        }
    },

    //U
    async updateUser(req, res, next) {
        try {
            const updatedUser = await User.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
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
    async deleteUser(req, res, next) {
        try {
            const findUser = await User.findOne({ _id: req.params.id });
            console.log(findUser);
            console.log('findUser.email', findUser.email);
            console.log('req.body', req.body.email);
            console.log('request password: ', req.body.password, ' database userPass', findUser.password)
            //   const match = await bcrypt.compare(req.body.password, findUser.password);
            //   console.log(match);
            if (findUser.email !== req.body.email || findUser.password !== req.body.password) {
                res.json('Password is incorrect or not Authorized');
            } else if (findUser.email === req.body.email && findUser.password === req.body.password) {
                await User.deleteOne(findUser);
                res.json('userDeleted');
            }

        } catch (error) {
            res.status(400).json('Bad Credentials');
        }
    },
    async getAllUsers(req, res) {
        try {
            const users = await User.find({})
            res.json(users)
        } catch (error) {
            res.status(400).json(error);
            
        }
    }
}


module.exports = {
    checkToken,
    dataController,
    apiController
}