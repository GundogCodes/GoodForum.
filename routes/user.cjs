const express = require('express')


const router = express.Router()
const {checkToken,dataController,apiController} = require('../controllers/user.cjs')

const ensureLoggedIn = require('../config/ensureLoggedIn.cjs')

//INDUCES
//I
//N
//D
router.delete('/:id', dataController.deleteUser)
//U
router.put('/:id', dataController.updateUser, apiController.auth)
//C
router.post('/new', dataController.createUser, apiController.auth)
router.post('/login', dataController.loginUser,apiController.auth)
//E
//S
router.get('/:id', dataController.getUser)

router.get('/check-token', ensureLoggedIn, checkToken)

module.exports = router

