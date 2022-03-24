import { dataRooms } from "../../../database/database";
import { getCookie, setCookies } from "cookies-next";
import { v4 } from "uuid";

export default (req, res) => {
  let { idRoom, idUser } = req.query;
  if (!idUser) {
    if (getCookie("ghostId", { req, res })) {
      idUser = getCookie("ghostId", { req, res });
    } else {
      idUser = v4();
      setCookies("ghostId", idUser, { req, res });
    }
  }

  if (idUser) {
    dataRooms.findOne({ _id: idRoom }, (err, docs) => {
      if (err) {
        res.status(400);
      } else {
        dataRooms.update(
          { _id: idRoom },
          { $set: { roomIsFull: false }, $pull: { users: idUser } },
          {},
          (err, numReplaced) => {
            if (err) {
              res.status(400);
            } else {
              res
                .status(200)
                .json({ status: "ok", message: "userExitTheRoom" });
            }
          }
        );
      }
    });
  } else {
    res.status(400);
  }
};
