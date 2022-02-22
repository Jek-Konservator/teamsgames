import { dataRooms, dataUsers } from "../../../database/database";
import { getCookie, setCookies } from "cookies-next";

export default (req, res) => {
    const { roomName, gameName, maxUsers, message, roomId } = req.body;
    dataRooms.findOne({_id:roomId},(err,docs)=>{
        if(err){
            res.status(400)
        }else{
            if(docs){
                    if(docs.ownerLogin === "Ghost" && docs.ghostId === getCookie("ghostId",{req,res})){
                        dataRooms.update({_id:roomId},{$set:{ roomName, gameName, maxUsers, message,}},{},(err, numReplaced)=>{
                            if(err){
                                res.status(400)
                            }else{
                                res.status(200).json({status:"ok", message:"editedRoom"})
                            }
                        })
                    }else {
                        //autorez
                    }
            }else{
                res.status(404)
            }
        }
    })
};

