const app = require("express")();
const http = require("http").createServer(app);
const io = require("socket.io")(http, {
  cors: {
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
  },
});
const {
  addNewUser,
  getAllUsers,
  disconnectUser,
  getUserById,
} = require("./users");

io.on("connection", (socket) => {

  // join a new user
  socket.on("join", ({ email, sessionName, others }) => {
    //new user added
    const user = addNewUser({
      id: socket.id,
      email,
      sessionName,
      name: others.name,
      photo: others.photo,
      isAdmin: others.isAdmin,
    });
    socket.join(sessionName);

    // get all users from a session
    const userList = getAllUsers(sessionName);
    io.to(sessionName).emit("userList", { userList });
  });

  // disconnect user from session
  socket.on("disconnect", () => {
    const user = disconnectUser(socket.id);
    if (user) {
      const userList = getAllUsers(user.sessionName);
      io.to(user.sessionName).emit("userList", { userList });
    }
  });

  // get message from user
  socket.on("message", (message) => {
    const user = getUserById(socket.id);
    io.to(user.sessionName).emit("message", {
      user: user.name,
      text: message,
      email: user.email,
    });
  });

  // get user drawing in board
  socket.on("draw", (draw) => {
    const user = getUserById(socket.id);
    io.to(user.sessionName).emit("draw", draw);
  });
});

const PORT = process.env.PORT || 5000;
http.listen(PORT, () => console.log(`listening on port ${PORT}`));
