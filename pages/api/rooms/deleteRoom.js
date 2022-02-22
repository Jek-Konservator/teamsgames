import { dataRooms } from "../../../database/database";
import {getCookie, removeCookies} from "cookies-next";

export default (req, res) => {
  const { idRoom, ownerLogin } = req.query;

  dataRooms.remove(
    { _id: idRoom },
      ownerLogin === "Ghost"
      ? { ghostId: getCookie("ghostId", { req, res }) }
      : { ownerLogin },
    (err, numRemoved) => {
      if (err) {
        res.status(400).json(err);
      } else {
        if (numRemoved > 0) {
            if(ownerLogin === "Ghost"){
                removeCookies("ghostId",{req,res})
                res.status(200).json({ status: "ok", message: "roomDelete" });
            }else{
                res.status(200).json({ status: "ok", message: "roomDelete" });
            }

        } else {
          res.status(200).json({ status: "err", message: "room!Delete" });
        }
      }
    }
  );
};
