const express = require('express')
const commentController = require('../controllers/comment.cjs')
const router = express.Router()

//comment routes

router.post('/post/:id', userController.auth, forumController.addComment)
router.delete('/post/:id', userController.auth, forumController.deleteComment)
router.put('/post/:id', userController.auth, forumController.editComment)
router.get('/post/:id', userController.auth, forumController.showAComment)


module.exports = router