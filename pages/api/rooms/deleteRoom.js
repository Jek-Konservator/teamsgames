import { dataRooms } from "../../../database/database";
import { getCookie, removeCookies } from "cookies-next";

export default (req, res) => {
  const { idRoom, ownerId } = req.query;

  dataRooms.remove(
    { _id: idRoom },
    { ownerId: getCookie("ghostId", { req, res }) },
    (err, numRemoved) => {
      if (err) {
        res.status(400).json(err);
      } else {
        if (numRemoved > 0) {
          res.status(200).json({ status: "ok", message: "roomDelete" });
        } else {
          res.status(200).json({ status: "err", message: "room!Delete" });
        }
      }
    }
  );
};
