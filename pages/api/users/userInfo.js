import { dataUsers } from "../../../database/database";
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
    const docs = getCookie("ghostId", { req, res });
    res.status(200).json({ status: "userGhost", docs });
  } else {
    res.status(200).json({ status: "userUndefined" });
  }
};
