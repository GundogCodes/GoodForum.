const express = require('express')
const commentController = require('../controllers/comment.cjs')
const router = express.Router()

//comment routes

router.post('/post/:id', commentController.addComment)
router.delete('/post/:id',  commentController.deleteComment)
router.put('/post/:id', commentController.editComment)
router.get('/post/:id', commentController.showAComment)


module.exports = router