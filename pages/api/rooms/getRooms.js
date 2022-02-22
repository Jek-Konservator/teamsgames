import { dataRooms } from "../../../database/database";

export default (req, res) => {
  const { gameName } = req.query;
  dataRooms.find({ gameName }, (err, docs) => {
    if (err) {
      res.status(400).json(err);
    } else {
      res.status(200).json(docs);
    }
  });
};
