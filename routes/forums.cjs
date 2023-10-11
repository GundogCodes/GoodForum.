const express = require('express')
const router = express.Router()
const forumController = require('../controllers/forums.cjs')


//INDUCES

//forum routes
router.get('/',  forumController.showAllForums) //works
router.post('/new',  forumController.createNewForum)
router.put('/:id', forumController.updateNewForum)
router.get('/:id', forumController.showAforum)
router.delete('/:id',  forumController.deleteAForum)


module.exports = router