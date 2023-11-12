const express = require('express')
const chatsController = require('../controllers/chat.cjs')
const router = express.Router()

//INDUCES

router.get('/:id', chatsController.getChat)
router.post('/:id', chatsController.createChat)
router.delete('/:id', chatsController.deleteChat)

module.exports =router