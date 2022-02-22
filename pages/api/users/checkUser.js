import { dataUsers } from "../../../database/database";

export default (req, res) => {
  const { login, password } = req.query;
  dataUsers.findOne({ login, password }, (err, docs) => {
    if (err) {
      res.status(400).json(err);
    } else {
      if (docs) {
        res.status(200).json({ message: "userAccepted", userInfo: docs });
      } else {
        res.status(200).json({ message: "userNotAccepted" });
      }
    }
  });
};
