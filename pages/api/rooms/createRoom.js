import { dataRooms, dataUsers } from "../../../database/database";
import { getCookie, setCookies } from "cookies-next";
import { v4 } from "uuid";
export default (req, res) => {
  const { roomName, gameName, userLogin, maxUsers, message } = req.body;

  if (userLogin === "Ghost") {
    if (getCookie("ghostId", { req, res })) {
      const ghostId = getCookie("ghostId", { req, res });
      dataRooms.findOne({ ghostId }, (err, docs) => {
        if (err) {
          res.status(400);
        } else {
          if (docs) {
            res.status(200).json({ status: "err", message: "userHasRoom" });
          } else {
            dataRooms.insert(
              {
                roomName,
                gameName,
                ownerId: ghostId,
                maxUsers,
                users: [ghostId],
                message,
                roomIsFull: false,
                ghostId,
              },
              (err, newDoc) => {
                if (err) {
                  res.status(400);
                } else {
                  res.status(201).json({ status: "ok", newDoc });
                }
              }
            );
          }
        }
      });
    } else {
      const ghostId = v4();
      dataRooms.insert(
        {
          roomName,
          gameName,
          ownerId: ghostId,
          maxUsers,
          users: [ghostId],
          message,
          roomIsFull: false,
          ghostId: ghostId,
        },
        (err, newDoc) => {
          if (err) {
            res.status(400);
          } else {
            setCookies("ghostId", newDoc.ghostId, { req, res });
            res.status(201).json({ status: "ok", newDoc });
          }
        }
      );
    }
  }
};

/*dataRooms.findOne({ idOwner: userLogin }, (err, docs) => {
    if (err) {
      res.status(400).json(err);
    } else {
      if (docs) {
        res.status(200).json({ message: "userHasRoom" });
      } else {
        if (undefinedUser) {
          dataRooms.insert(
            {
              roomName,
              gameName,
              loginOwner: userLogin,
              maxUsers,
              users: [userLogin],
              message,
              roomIsFull: false,
              undefinedUser,
            },
            (err, newDoc) => {
              console.log(newDoc);
            }
          );
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
            setCookies("user", "aaa", { req, res });
            console.log(getCookie("user", { req, res }));
            res.status(201).json({ message: "createRoom", newRoomInfo: docs });
          }
        });
      }
    }
  });*/
