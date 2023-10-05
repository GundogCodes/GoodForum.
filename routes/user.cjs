const express = require('express')


const router = express.Router()
const {checkToken,dataController,apiController} = require('../controllers/user.cjs')

const ensureLoggedIn = require('../config/ensureLoggedIn.cjs')

//INDUCES
//I
//N
//D
router.get('/check-token', ensureLoggedIn, checkToken)
router.delete('/:id', dataController.deleteUser) //works
//U
router.put('/:id', dataController.updateUser, apiController.auth) //works
//C
router.post('/new', dataController.createUser, apiController.auth) //works
router.post('/login', dataController.loginUser,apiController.auth) //works
//E
//S
router.get('/:id', dataController.getUser) //works


module.exports = router

