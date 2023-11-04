const cors = require('cors')
const checkToken = require('./config/checkToken.cjs')
const express = require('express')
const multer  = require('multer')

//created a express app
const app = express()

//import path to use and manipulate the file paths on our system
const path = require('path')


const upload = multer({dest:  path.resolve('profilePics')}) // multer function gives you back function called upload, which is a middleware
//                                           we can put anywhere with some options
//                                           we care bout the dest option which basically sets up a folder called uploads
//                                           to post our files we care bout the dest option which basically sets
//                                           up a folder to post our files
//                                           
//import log http requests with morgan
const logger = require('morgan')

//using json packages to communicate with server/clients
app.use(express.json())
app.use(cors())


//app will use a local object in its responses which can contain info from the requests
app.use((req,res,next)=>{
    res.locals.data = {}
    next()
})

app.use(checkToken)

//use logger to log http requests
app.use(logger('dev'))
//check if there is a user in the requests
const ensureLoggedIn  = require('./config/ensureLoggedIn.cjs')


//defining routes(endpoints) of app(api) where req/res can be done 
//and information can be exchanged and check if they need to be logged in
app.use('/api/users',require('./routes/user.cjs'))
app.use('/api/forum',require('./routes/forums.cjs'))
app.use('/api/post',require('./routes/post.cjs'))
app.use('/api/comment',require('./routes/comment.cjs'))
app.use('/images', express.static('uploadProfilePic'))
app.post('/uploadProfilePic', upload.single('uploadProfilePic'), (req, res) => {
  res.send('<h1>hi</h1>')
});


// catch all for wrong routes
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
  })


module.exports = app