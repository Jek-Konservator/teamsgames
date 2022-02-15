import React, { useState } from "react";
import "./newRoomComponentStyle.module";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { GameSelect } from "../gameSelect";
import { v4 } from "uuid";
import {
  InputsStyled,
  NewRoomComponentContendStyled,
  NewRoomComponentStyled,
} from "./newRoomComponentStyle.module";
import { ButtonGoMainIcon } from "../../UIKit/buttonGoMainIcon";
import { TextFieldKit } from "../../UIKit/textField";
import { ButtonKit } from "../../UIKit/button";
import Link from "next/link";

export const NewRoomComponent = () => {
  const [roomInfo, setRoomInfo] = useState({
    roomName: "",
    gameName: "",
    maxUsers: "",
    message: "",
  });

  /*const newRoom = () => {
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
  };*/

  return (
    <NewRoomComponentStyled>
      <NewRoomComponentContendStyled>
        <InputsStyled>
          <TextFieldKit
            onChange={(e) =>
              setRoomInfo({ ...roomInfo, roomName: e.target.value })
            }
            type="text"
            placeholder="Название комнаты"
          />
          <GameSelect />
          <TextFieldKit
            onChange={(e) =>
              setRoomInfo({ ...roomInfo, message: e.target.value })
            }
            placeholder="Сообщение для контакта"
          />
          <TextFieldKit
            onChange={(e) =>
              setRoomInfo({ ...roomInfo, maxUsers: e.target.value })
            }
            type="number"
            placeholder="Количество участников комнаты"
          />
        </InputsStyled>

        <div className="controlButtonsStyled">
          <ButtonKit className="controlButtonStyled">Создать</ButtonKit>
          <Link href="/">
            <ButtonKit className="controlButtonStyled">Отменить</ButtonKit>
          </Link>
        </div>
      </NewRoomComponentContendStyled>
    </NewRoomComponentStyled>
  );
};
