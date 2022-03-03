const app = require("express")();
const server = require("http").Server(app)
const port = parseInt(process.env.PORT, 10) || 3000;
const io = require("socket.io")(server);

const rooms = require("./routes/rooms");
const users = require("./routes/users");

app.use(rooms);
app.use(users);

io.on("connection", (socket) => {
  console.log(socket);
});

module.exports = app;

server.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
