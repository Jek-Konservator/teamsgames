const { dataUsers } = require("../database");

const newUser = (req, res) => {
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

const checkUser = (req, res) => {
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
const userInfo = (req, res) => {
  const { userId } = req.query;
  console.log(userId);
  dataUsers.findOne({ userId }, (err, docs) => {
    if (err) {
      res.status(400).json(err);
    } else {
      res.status(200).json(docs);
      console.log(docs);
    }
  });
};

module.exports = {
  newUser,
  checkUser,
  userInfo,
};
