import React, { useState } from "react";
import "./styled.css";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { GameSelect } from "../gameSelect";
import { v4 } from "uuid";

export const NewRoomModal = () => {
  const [roomInfo, setRoomInfo] = useState({
    roomName: "",
    gameName: "",
    maxUsers: "",
    message: "",
  });

  const dispatch = useDispatch();
  const { userLogin, visibleNewRoomModal } = useSelector(
    ({ mainReducer }) => mainReducer
  );

  const newRoom = () => {
    if (userLogin !== "") {
      axios
        .post(`/app/createRoom`, {
          roomName: roomInfo.roomName,
          gameName: roomInfo.gameName,
          maxUsers: roomInfo.maxUsers,
          userLogin: userLogin,
          message: roomInfo.message,
        })
        .then(({ data }) => {
          if (data.message === "createRoom") {
            dispatch({ type: "newUserRoom", data: data.newRoomInfo._id });
            dispatch({ type: "closeModal", data: "visibleNewRoomModal" });
          } else {
            console.log(data.message);
          }
        })
        .catch(({ data }) => console.log(data));
    } else {
      axios
        .post(`/app/createRoom`, {
          roomName: roomInfo.roomName,
          gameName: roomInfo.gameName,
          maxUsers: roomInfo.maxUsers,
          userLogin: v4(),
          message: roomInfo.message,
          undefinedUser: true,
        })
        .then(({ data }) => {
          if (data.message === "createRoom") {
            console.log(222);
            dispatch({
              type: "newUserRoom",
              data: {
                login: data.newRoomInfo.loginOwner,
                userRoom: data.newRoomInfo._id,
              },
            });
            console.log(123);
            dispatch({ type: "closeModal", data: "visibleNewRoomModal" });
          } else {
            console.log(data.message);
          }
        })
        .catch(({ data }) => console.log(data));
    }
  };

  return (
    <>
      {visibleNewRoomModal && (
        <div className="newRoomModalStyled">
          <button
            onClick={() => {
              dispatch({ type: "closeModal", data: "visibleNewRoomModal" });
            }}
            className="buttonCloseModal "
          >
            X
          </button>
          <div className="inputsStyled">
            <input
              onChange={(e) =>
                setRoomInfo({ ...roomInfo, roomName: e.target.value })
              }
              className="inputStyled"
              type="text"
              placeholder="Название комнаты"
            />
            <GameSelect
              onChangeFunction={(e) =>
                setRoomInfo({ ...roomInfo, gameName: e.target.value })
              }
            />
            <input
              onChange={(e) =>
                setRoomInfo({ ...roomInfo, message: e.target.value })
              }
              className="inputStyled"
              placeholder="Сообщение для контакта"
            />{" "}
            <input
              onChange={(e) =>
                setRoomInfo({ ...roomInfo, maxUsers: e.target.value })
              }
              className="inputStyled"
              type="number"
              placeholder="Количество участников комнаты"
            />
          </div>

          <div className="controlButtonsStyled">
            <button onClick={() => newRoom()} className="controlButtonStyled">
              Создать
            </button>
            <button
              onClick={() => {
                dispatch({ type: "closeModal", data: "visibleNewRoomModal" });
              }}
              className="controlButtonStyled"
            >
              Отменить
            </button>
          </div>
        </div>
      )}
    </>
  );
};
