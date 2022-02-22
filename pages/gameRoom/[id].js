import React from "react";
import { GameRoomComponent } from "../../src/components/rooms/gameRoomComponent";
import axios from "axios";

const GameRoom = ({ roomInfo }) => {
  return <GameRoomComponent roomInfo={roomInfo} />;
};
export default GameRoom;

export async function getServerSideProps(context) {
  const { data } = await axios.get(
    `http://localhost:3000/api/rooms/getRoom?roomId=${context.query.id}`
  );
  return {
    props: { roomInfo: data.docs },
  };
}
