import { Server } from "socket.io";

const ioHandler = (req, res) => {
  if (!res.socket.server.io) {
    console.log("First use, starting socket.io");

    const io = new Server(res.socket.server);

    io.on("connection", (socket) => {
      console.log("a user connected");

      socket.on("connectToRoom", ({ msg }) => {
        console.log(msg);

        socket.emit("connectedToRoom", {
          msg: "Success connect",
        });
      });

      socket.on("disconnectFromRoom", ({ msg }) => {
        console.log(msg);

        socket.emit("disconnectedFromRoom", {
          msg: "Success disconnect",
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
