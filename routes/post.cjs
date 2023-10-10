const express = require('express')
const postController = require('../controllers/post.cjs')
const router = express.Router()

//post routes
router.post('/:id', userController.auth, forumController.makeAPost)
router.delete('/:id', userController.auth, forumController.deleteAPost)
router.put('/:id', userController.auth, forumController.updateAPost)
router.get('/:id', userController.auth, forumController.showAPost)



module.exports = router