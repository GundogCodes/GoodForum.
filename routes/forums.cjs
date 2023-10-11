const express = require('express')
const router = express.Router()
const forumController = require('../controllers/forums.cjs')


//INDUCES

//forum routes
router.get('/',  forumController.showAllForums) //works
router.post('/new',  forumController.createNewForum) //works
router.put('/:id', forumController.updateForum) //works
router.put('/add/:id', forumController.addAMember)
router.put('/remove/:id', forumController.removeAMember)
router.get('/:id', forumController.showAforum) //works
router.delete('/:id',  forumController.deleteAForum) //works


module.exports = router