import React from "react";
import "./styled.css";
import { GoGameModal } from "../goGameModal";
import { NewRoomModal } from "../newRoomModal";
import { useDispatch, useSelector } from "react-redux";
import { Login } from "../login";
import { UserRoomModal } from "../userRoomModal";
import { GameSelect } from "../gameSelect";

export const Main = () => {
  const {idUserRoom} = useSelector(({ mainReducer }) => mainReducer);

  const dispatch = useDispatch();

  const noGameRooms = () => {
    console.log("no Game Rooms");
  };

  return (
    <div className="mainStyled">
      <button
        onClick={() => {
          dispatch({ type: "openModal", data: "visibleGoGameModal" });
        }}
        className="buttonGoGameStyled"
      >
        Играть
      </button>

      <GameSelect
        width={"150px"}
        onChangeFunction={(e) =>
          dispatch({ type: "gameSelected", data: e.target.value })
        }
      />
      <button
        onClick={() => {
          idUserRoom === ""
            ? dispatch({ type: "openModal", data: "visibleNewRoomModal" })
            : dispatch({ type: "openModal", data: "visibleUserRoomModal" });
        }}
        className="buttonNewRoomStyled"
      >
        {idUserRoom === "" ? "Создать новую комнату" : " Моя комната"}
      </button>
      <Login />
      <UserRoomModal />
      <GoGameModal noGameRooms={noGameRooms} />
      <NewRoomModal />
    </div>
  );
};

//TODO Нихуй не работает, (не выидит комнату при играть!!!)
