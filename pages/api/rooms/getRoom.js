import { dataRooms } from "../../../database/database";

export default (req, res) => {
  const { roomId } = req.query;
  dataRooms.findOne(
     { _id: roomId },
    (err, docs) => {
      if (err) {
        res.status(400);
      } else {
        res.status(200).json({status:"ok",docs});
      }
    }
  );
};
