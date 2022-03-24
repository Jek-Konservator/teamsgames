import { dataRooms } from "../../../database/database";

export default (req, res) => {
  const { gameName, roomId } = req.query;
    console.log( gameName, roomId)
  dataRooms.findOne(
    roomId
      ? { gameName, roomIsFull: false, $not: { _id: roomId } }
      : { gameName, roomIsFull: false },
    (err, docs) => {
      if (err) {
        res.status(400);
      } else {
          console.log(docs)
        res.status(200).json(docs);
      }
    }
  );
};
