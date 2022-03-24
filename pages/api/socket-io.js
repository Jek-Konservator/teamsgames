import { Server } from "socket.io";
import axios from "axios";

const ioHandler = (req, res) => {
  if (!res.socket.server.io) {
    console.log("First use, starting socket.io");

    const io = new Server(res.socket.server);

    io.on("connection", (socket) => {
      socket.on("acceptRoom", ({ idRoom }) => {
        socket.join(idRoom);
        socket.emit("userAccepted", {
          idRoom: idRoom,
        });
      });
      socket.on("disconnect", (reason) => {
        console.log(reason, 123123);
      });
      socket.on("editRoom", ({idRoom}) => {
        socket.to(idRoom).emit("editedRoom");
        socket.emit("editedRoom");
      });
      socket.on("roomDelete", ({idRoom}) => {
        socket.to(idRoom).emit("roomDelete");
        socket.emit("roomDelete");
      });

      socket.on("exitTheRoom", ({ idRoom, idUser }) => {
        socket.leave(idRoom);
        axios
          .put(
            `http://localhost:3000/api/rooms/userExitTheRoom?idRoom=${idRoom}&idUser=${idUser}`
          )
          .then(({ data }) => {
            if (data.status === "ok") {
              socket.to(idRoom).emit("updateUsers");
              socket.emit("exitedTheRoom")
            } else {
              console.log("err");
            }
          });
      });

      socket.on("newUserAccepted", ({ idRoom, idUser }) => {
        axios
          .put(
            `http://localhost:3000/api/rooms/userAccept?idRoom=${idRoom}&idUser=${idUser}`
          )
          .then(({ data }) => {
            if (data.status === "ok") {
              socket.emit("updateUsers");
              socket.to(idRoom).emit("updateUsers");
            } else {
              console.log("err");
            }
          });
      });
    });

    res.socket.server.io = io;
  } else {
    console.log("socket.io already running");
  }
  res.end();
};

export const config = {
  api: {
    bodyParser: false,
  },
};

export default ioHandler;
