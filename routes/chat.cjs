const express = require('express')
const chatsController = require('../controllers/chat.cjs')
const router = express.Router()

//INDUCES

router.post('/createChat/:id', chatsController.createChat) //WORKS
router.get('/:id', chatsController.getChat) //WORKS
router.delete('/:id', chatsController.deleteChat) //WORKS

module.exports =router