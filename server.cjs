require("dotenv").config();
require("./config/database.cjs");

const app = require("./app-server.cjs");

const PORT = process.env.PORT || 8004;

const server = app.listen(PORT, () => {
  console.log(`API Listening on port ${PORT}`);
});

/****************************************************************** SOCKET.IO ******************************************************************/

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
    console.log("userData", userData._id);
    socket.emit("connected");
  });

  socket.on("join chat", (room) => {
    socket.join(room);
    console.log("user joined room (ChatId): ", room);
  });

  socket.on("new message", (newMessageReceived) => {
    var chat = newMessageReceived.chat;
    console.log("Chat in socket is: ", chat);
    if (!chat.users) return console.log("chat.users not defined");
    chat.users.forEach((user) => {
      if (user._id == newMessageReceived.sender._id) {
        socket.in(user._id).emit("message received", newMessageReceived);
      }
    });
  });
});
