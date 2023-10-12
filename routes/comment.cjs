const express = require('express')
const commentController = require('../controllers/comment.cjs')
const router = express.Router()

//comment routes

router.put('/:id', commentController.editComment) //works
router.delete('/:id',  commentController.deleteComment) //works
router.get('/:id',  commentController.showComment) //works


module.exports = router