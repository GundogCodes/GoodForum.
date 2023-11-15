const express = require("express");
const messageController = require("../controllers/messages.cjs");
const router = express.Router();

router.post("/:id", messageController.sendMessage); //WORKS
router.get("/:chatId", messageController.getMessages); //WORKS

module.exports = router;
