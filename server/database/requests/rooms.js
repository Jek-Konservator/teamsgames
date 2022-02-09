const { dataRooms, dataUsers } = require("../database");

const newRoom = (req, res) => {
  const { roomName, gameName, maxUsers, userLogin, message, undefinedUser } =
    req.body;
  dataRooms.findOne({ idOwner: userLogin }, (err, docs) => {
    if (err) {
      res.status(400).json(err);
    } else {
      if (docs) {
        res.status(200).json({ message: "userHasRoom" });
      } else {
        if (undefinedUser) {
          dataRooms.insert({
            roomName,
            gameName,
            loginOwner: userLogin,
            maxUsers,
            users: [userLogin],
            message,
            roomIsFull: false,
            undefinedUser,
          });
        } else {
          dataRooms.insert({
            roomName,
            gameName,
            loginOwner: userLogin,
            maxUsers,
            users: [userLogin],
            message,
            roomIsFull: false,
          });
          res.status(201).json({ message: "createRoom", newRoomInfo: docs });
        }
        dataRooms.findOne({ loginOwner: userLogin }, (err, docs) => {
          if (err) {
            res.status(400).json(err);
          } else {
            dataUsers.update(
              { login: userLogin },
              { $set: { userRoom: docs._id } },
              {},
              function (err, numReplaced) {
                if (err) {
                  res.status(400);
                } else {
                  res.status(201);
                }
              }
            );
            res.status(201).json({ message: "createRoom", newRoomInfo: docs });
          }
        });
      }
    }
  });
};

const getRooms = (req, res) => {
  const { gameName } = req.query;
  dataRooms.find({ gameName }, (err, docs) => {
    if (err) {
      res.status(400).json(err);
    } else {
      res.status(200).json(docs);
    }
  });
};
const deleteRoom = (req, res) => {
  const { idRoom, loginOwner } = req.query;
  dataRooms.remove(
    { _id: idRoom, loginOwner: loginOwner },
    (err, numRemoved) => {
      if (err) {
        res.status(400).json(err);
      } else {
        if (numRemoved > 0) {
          res.status(200).json({ message: "roomDelete" });
        } else {
          res.status(200).json({ message: "room!Delete" });
        }
      }
    }
  );
};

const getRoom = (req, res) => {
  const { idRoom, gameName } = req.query;
  dataRooms.findOne(
    gameName !== undefined ? { gameName, roomIsFull: false } : { _id: idRoom },
    (err, docs) => {
      if (err) {
        res.status(400).json(err);
      } else {
        res.status(200).json(docs);
      }
    }
  );
};
const userAccept = (req, res) => {
  const { idRoom, idUser } = req.query;
  dataRooms.findOne({ _id: idRoom, roomIsFull: false }, (err, docs) => {
    if (err) {
      res.status(400).json(err);
    } else {
      if (docs) {
        dataRooms.update(
          { _id: idRoom },
          docs.users.length + 1 == docs.maxUsers
            ? { $set: { roomIsFull: true }, $push: { users: idUser } }
            : { $push: { users: idUser } },
          {},
          function (err, numReplaced) {
            if (err) {
              res.status(400);
            } else {
              res.status(200).json({ message: "userConnected" });
            }
          }
        );
      } else {
        res.status(200).json({ message: "roomsFull" });
      }
    }
  });
};

module.exports = {
  newRoom,
  getRooms,
  getRoom,
  deleteRoom,
  userAccept,
};
