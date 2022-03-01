import { dataRooms, dataUsers } from "../../../database/database";
import { getCookie, getCookies } from "cookies-next";

export default (req, res) => {
  if (getCookie("userId", { req, res })) {
    const userId = getCookie("userId", { req, res });
    dataUsers.findOne({ userId }, (err, docs) => {
      if (err) {
        res.status(400).json(err);
      } else {
        res.status(200).json({ status: "userInfo", docs });
      }
    });
  } else if (getCookie("ghostId", { req, res })) {
    let ghostId = getCookie("ghostId", { req, res });
    dataRooms.findOne({ ownerId: ghostId }, (err, docs) => {
      if (err) {
        res.status(400);
      } else {
        if (docs) {
          res.status(200).json({
            status: "userGhost",
            docs: { _id: ghostId, idUserRoom: docs._id },
          });
        } else {
          res.status(200).json({ status: "userGhost", docs: { _id: ghostId } });
        }
      }
    });
  } else {
    res.status(200).json({ status: "userUndefined" });
  }
};
