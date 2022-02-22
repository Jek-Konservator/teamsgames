import { dataRooms } from "../../../database/database";

export default (req, res) => {
  const { idRoom, idUser } = req.query;
  dataRooms.findOne({ _id: idRoom, roomIsFull: false }, (err, docs) => {
    if (err) {
      res.status(400).json(err);
    } else {
      if (docs) {
        dataRooms.update(
          { _id: idRoom },
          docs.users.length + 1 === docs.maxUsers
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
