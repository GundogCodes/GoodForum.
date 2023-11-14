const cors = require('cors')
const checkToken = require('./config/checkToken.cjs')
const express = require('express')
const app = express()
const multer  = require('multer')
/****************************************************************** MULTER ******************************************************************/
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'profilePics/')
  },
  filename: function (req, file, cb) {
    //const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.originalname)
  }
}) 

const upload = multer({ storage: storage }) // multer function gives you back function called upload, which is a middleware
//                                           we can put anywhere with some options
//                                           we care bout the dest option which basically sets up a folder called uploads
//                                           to post our files we care bout the dest option which basically sets
//                                           up a folder to post our files
//                                           
app.post('/api/profilePic', upload.single('profilePic'), (req, res) => {
  const imageName = req.file.filename
  console.log(imageName)
  res.send(imageName)
});

//import path to use and manipulate the file paths on our system
const path = require('path')




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
app.use('/api/chat',require('./routes/chat.cjs'))
app.use('/api/message',require('./routes/message.cjs'))
app.use('/images', express.static('uploadProfilePic'))

app.use('/profilePics', express.static('images'))

// catch all for wrong routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

module.exports = app