const express = require('express')
const postController = require('../controllers/post.cjs')
const router = express.Router()

//post routes
router.post('/:id',  postController.createPost)
router.delete('/:id', postController.deletePost)
//router.put('/:id',  postController.updateAPost)
router.get('/:id',  postController.getPost)



module.exports = router