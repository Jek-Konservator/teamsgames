import React, { useState } from "react";
import "./newRoomStyle.module";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { GameSelect } from "../../gameSelect";
import { v4 } from "uuid";
import {
  EditRoomComponentContentStyled,
  EditRoomComponentStyled,
  InputsStyled,
} from "./newRoomStyle.module";
import { ButtonGoMainIcon } from "../../../UIKit/buttonGoMainIcon";
import { TextFieldKit } from "../../../UIKit/textField";
import { ButtonKit } from "../../../UIKit/button";
import Link from "next/link";
import { useRouter } from "next/router";
import { userCreateRoom } from "../../../toolKitRedux/toolKitSlice";

export const EditRoomComponent = ({ funcEditRoom, roomEditInfo }) => {
  const [roomInfo, setRoomInfo] = useState(
    roomEditInfo
      ? {
          roomName: roomEditInfo.roomName,
          gameName: roomEditInfo.gameName,
          maxUsers: roomEditInfo.maxUsers,
          message: roomEditInfo.message,
        }
      : {
          roomName: "",
          gameName: "",
          maxUsers: "",
          message: "",
        }
  );

  const router = useRouter();
  const dispatch = useDispatch();

  const newRoom = () => {
    axios
      .post(`/api/rooms/createRoom`, {
        roomName: roomInfo.roomName,
        gameName: roomInfo.gameName,
        maxUsers: roomInfo.maxUsers,
        userLogin: "Ghost",
        message: roomInfo.message,
      })
      .then(({ data }) => {
        if (data.status === "ok") {
          dispatch(userCreateRoom({ _id: data.newDoc._id }));
          router.push(`/gameRoom/${data.newDoc._id}`);
        } else {
          console.log(data.message);
        }
      })
      .catch(() => console.log(Error));
  };

  const editRoom = () => {
    if (
      JSON.stringify({
        roomName: roomEditInfo.roomName,
        gameName: roomEditInfo.gameName,
        maxUsers: roomEditInfo.maxUsers,
        message: roomEditInfo.message,
      }) !== JSON.stringify(roomInfo)
    ) {
      axios
        .post(`/api/rooms/editRoom`, {
          ...roomInfo,
          roomId: roomEditInfo._id,
        })
        .then(({ data }) => {
          if (data.status === "ok") {
              funcEditRoom();
          }
        })
        .catch(({ err }) => console.log(err));
    } else {
      console.log("???????????? ???? ????????????????????");
    }
  };

  return (
    <EditRoomComponentStyled>
      <EditRoomComponentContentStyled>
        {roomEditInfo === false ? <ButtonGoMainIcon /> : null}
        <InputsStyled>
          <TextFieldKit
            defaultValue={roomInfo.roomName}
            onChange={(e) =>
              setRoomInfo({ ...roomInfo, roomName: e.target.value })
            }
            type="text"
            placeholder="???????????????? ??????????????"
          />
          <GameSelect
            value={roomInfo.gameName !== "" ? roomInfo.gameName : null}
            onChange={(e) =>
              setRoomInfo({ ...roomInfo, gameName: e.target.innerText })
            }
          />
          <TextFieldKit
            defaultValue={roomInfo.message}
            onChange={(e) =>
              setRoomInfo({ ...roomInfo, message: e.target.value })
            }
            placeholder="?????????????????? ?????? ????????????????"
          />
          <TextFieldKit
            defaultValue={roomInfo.maxUsers}
            onChange={(e) =>
              setRoomInfo({ ...roomInfo, maxUsers: e.target.value })
            }
            type="number"
            placeholder="???????????????????? ???????????????????? ??????????????"
          />
        </InputsStyled>

        <div>
          {roomEditInfo ? (
            <>
              <ButtonKit onClick={() => editRoom()}>????????????????</ButtonKit>

              <ButtonKit onClick={() => setRoomEdit(false)}>????????????????</ButtonKit>
            </>
          ) : (
            <>
              <ButtonKit onClick={() => newRoom()}>??????????????</ButtonKit>
              <Link href="/">
                <a>
                  <ButtonKit>????????????????</ButtonKit>
                </a>
              </Link>
            </>
          )}
        </div>
      </EditRoomComponentContentStyled>
    </EditRoomComponentStyled>
  );
};
