const app = require("express")();
const server = require("http").Server(app);
const port = parseInt(process.env.PORT, 10) || 3000;

const rooms = require("./routes/rooms");
const users = require("./routes/users");

app.use(rooms);
app.use(users);


module.exports = app;

server.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
