const express = require('express')
const messageController = require('../controllers/messages.cjs')
const router = express.Router()

router.post('/:id', messageController.sendMessage)

module.exports =router