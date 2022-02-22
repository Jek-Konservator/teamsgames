import { dataRooms } from "../../../database/database";

export default (req, res) => {
  const { roomId, gameName } = req.query;
  console.log(gameName)
  dataRooms.findOne(
    gameName !== undefined ? { gameName, roomIsFull: false } : { _id: roomId },
    (err, docs) => {
      if (err) {
        res.status(400);
      } else {
        res.status(200).json({status:"ok",docs});
      }
    }
  );
};
