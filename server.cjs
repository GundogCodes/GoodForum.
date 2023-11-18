require("dotenv").config();
require("./config/database.cjs");
const cors = require("cors");

const http = require("http");
const app = require("./app-server.cjs");

const PORT = process.env.PORT || 8004;

const server = app.listen(PORT, () => {
  console.log(`API Listening on port ${PORT}`);
});

/****************************************************************** SOCKET.IO ******************************************************************/
app.use(cors());

const io = require("socket.io")(server, {
  pingTimeout: 60000,
  cors: {
    origin: "http://localhost:5173",
  },
});

io.on("connection", (socket) => {
  console.log("connected to socket.io!");

  socket.on("setup", (userData) => {
    socket.join(userData._id); //on set up create new room with the id of the user
    socket.emit("connected");
  });

  socket.on("join chat", (room) => {
    socket.join(room);
  });

  socket.on("new message", (newMessageReceived) => {
    var chat = newMessageReceived.chat;
    // console.log("var chat", newMessageReceived.chat);
    // console.log("Chat in socket is: ", chat);
    // if (!chat.users) return console.log("chat.users not defined");
    chat.users.forEach((user) => {
      console.log("chat._id", chat._id);
      if (user == newMessageReceived.sender._id) {
        socket.in(chat._id).emit("message received", newMessageReceived);
      }
    });
  });
});
