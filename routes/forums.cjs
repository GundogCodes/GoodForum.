const express = require('express')
const router = express.Router()
const forumController = require('../controllers/forums.cjs')


//INDUCES

//forum routes
router.get('/',  forumController.showAllForums) //works
router.post('/new',  forumController.createNewForum) //works
router.put('/:id', forumController.updateForumInfo) //works
//member stuff
router.put('/add/:id', forumController.addAMember) // works
router.put('/remove/:id', forumController.removeAMember) //works
//post to Forum
router.put('/post/:id', forumController.postToForum) //works

router.get('/:id', forumController.showAforum) //works
router.delete('/:id',  forumController.deleteAForum) //works


module.exports = router