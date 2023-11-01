const express  = require('express')
const router = express.Router()

router.post('/upload', upload.single('image'), (req,res)=>{
    res.json({message:'File uploaded sucessfully'})
})

module.exports = router