const app = require("express")();
const port = parseInt(process.env.PORT, 10) || 3001;
const bodyParser = require("body-parser");
const cors = require("cors");
const http = require("http").createServer(app);
const io = require("socket.io")(http);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const rooms = require("./database/requests/rooms");
const users = require("./database/requests/users");

app.post("/app/createRoom", rooms.newRoom);
app.get("/app/getRooms", rooms.getRooms);
app.get("/app/getRoom", rooms.getRoom);
app.get("/app/deleteRoom", rooms.deleteRoom);
app.get("/app/userAccept", rooms.userAccept);

app.post("/app/newUser", users.newUser);
app.get("/app/checkUser", users.checkUser);
app.get("/app/userInfo", users.userInfo);

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
