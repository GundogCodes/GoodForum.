const express = require('express')
const router = express.Router()
const forumController = require('../controllers/forumController')
const userController = require('../controllers/userController')

//INDUCES

//forum routes
router.get('/', userController.auth, forumController.showAllForums)
router.post('/new', userController.auth, forumController.createNewForum)
router.put('/:id', userController.auth, forumController.updateNewForum)
router.get('/:id', userController.auth, forumController.showAforum)
router.delete('/:id', userController.auth, forumController.deleteAForum)


module.exports = router