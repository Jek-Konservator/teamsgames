import { dataUsers } from "../../../database/database";

export default (req, res) => {
  const { login, password } = req.body;

  dataUsers.findOne({ login, password }, (err, docs) => {
    if (err) {
      res.status(400).json(err);
    } else {
      if (docs) {
        res.status(200).json({ message: "loginUsed" });
      } else {
        dataUsers.insert({ login, password, userRoom: "", userGame: "" });
        res.status(201).json({ message: "createUser" });
      }
    }
  });
};
