import { dataRooms } from "../../../database/database";

export default (req, res) => {
  const {userId} = req.query;
  dataRooms.findOne({ ghostId: userId }, (err, docs) => {
    if (err) {
      res.status(400);
    } else {
      if (docs) {
        res.status(200).json({ status: "roomFound", docs });
      } else {
        res.status(200).json({ status: "err", message: "roomNotFound" });
      }
    }
  });
};
