require('dotenv').config();
require('./config/database.cjs');

const app = require('./app-server.cjs');

const PORT = process.env.PORT || 8004;

const server = app.listen(PORT, () => {
  console.log(`API Listening on port ${PORT}`);
});

/****************************************************************** SOCKET.IO ******************************************************************/

const io = require('socket.io')(server, {
  pingTimeout:60000,
  cors:{
    origin: 'http://localhost:5173'
  },
}
  )

  io.on('connection', (socket)=>{
    
    console.log('connected to socket.io!')
    
    socket.on('setup', (userData)=>{
      socket.join(userData._id)
      console.log('userData',userData._id)
      socket.emit('user joined room')
    })

    socket.on('join chat',(room)=>{
      socket.join(room)
      console.log('user joined room:', room)
    })

  })