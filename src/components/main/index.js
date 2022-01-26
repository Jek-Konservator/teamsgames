import React, { useState } from "react";
import "./styled.css";
import { GoGameModal } from "../goGameModal";
import {NewRoomModal} from "../newRoomModal";
export const Main = () => {
  const [visibleGoGameModal, setVisibleGoGameModal] = useState(false);
  const [visibleNewRoomModal, setVisibleNewRoomModal] = useState(false);

  return (
    <div className="mainStyled">
      <button
        onClick={() => {
          setVisibleGoGameModal(true);
        }}
        className="buttonGoGameStyled"
      >
        Играть
      </button>
      <button onClick={()=>{setVisibleNewRoomModal(true)}} className="buttonNewRoomStyled">Создать новую комнату</button>
      {visibleGoGameModal && <GoGameModal />}
      {visibleNewRoomModal && <NewRoomModal />}
    </div>
  );
};
