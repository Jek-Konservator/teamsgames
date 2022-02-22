import React, { useCallback, useEffect, useState } from "react";
import "./gameRoomStyle.module";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { v4 } from "uuid";
import {
  GoGameRoomComponentContentStyled,
  GoGameRoomComponentControlButtonsStyled,
  GoGameRoomComponentInfoStyled,
  GoGameRoomComponentMessageToConnectStyled,
  GoGameRoomComponentNumberUsersStyled,
  GoGameRoomComponentStyled,
  GoGameRoomComponentUsersInfoStyled,
  GoGameRoomComponentUsersStyled,
} from "./gameRoomStyle.module";
import { ButtonKit } from "../../../UIKit/button";
import { ButtonGoMainIcon } from "../../../UIKit/buttonGoMainIcon";
import Link from "next/link";
import { ButtonNewRoomStyled } from "../../main/mainStyle.module";
import { EditRoomComponent } from "../editRoomComponent";
import { useRouter } from "next/router";

export const GameRoomComponent = ({ roomInfo }) => {
  const [accepted, setAccepted] = useState(false);
  const [roomEdit, setRoomEdit] = useState(false);

  const userInfo = useSelector(({ mainReducer }) => mainReducer.userInfo);

  const router = useRouter();

  const deleteRoom = () => {
    axios
      .delete(
        `/api/rooms/deleteRoom?idRoom=${roomInfo._id}&ownerLogin=${roomInfo.ownerLogin}`
      )
      .then(({ data }) => {
        if (data.status === "ok") {
          router.push(`/`);
        } else {
          console.log(data.message);
        }
      })
      .catch(() => console.log(Error));
  };

  return (
    <>
      {roomEdit ? (
        <EditRoomComponent setRoomEdit={setRoomEdit} roomEditInfo={roomInfo} />
      ) : (
        <GoGameRoomComponentStyled>

          <GoGameRoomComponentContentStyled>
            <ButtonGoMainIcon />
            <div>
              <GoGameRoomComponentInfoStyled>
                <div>{roomInfo.roomName}</div>
                <div>{roomInfo.gameName}</div>
              </GoGameRoomComponentInfoStyled>
              <GoGameRoomComponentNumberUsersStyled>
                {`${roomInfo.users.length}/${roomInfo.maxUsers}`}
              </GoGameRoomComponentNumberUsersStyled>
              <GoGameRoomComponentUsersStyled>
                {roomInfo.users.map((user) => {
                  return (
                    <GoGameRoomComponentUsersInfoStyled key={user}>
                      <div>{user}</div>
                    </GoGameRoomComponentUsersInfoStyled>
                  );
                })}
              </GoGameRoomComponentUsersStyled>
            </div>
            <div>
              {accepted ? (
                <GoGameRoomComponentMessageToConnectStyled>
                  {roomInfo.message}
                </GoGameRoomComponentMessageToConnectStyled>
              ) : (
                <GoGameRoomComponentControlButtonsStyled>
                  {userInfo._id === roomInfo.ghostId ? (
                    <>
                      <ButtonKit onClick={() => setRoomEdit(true)}>
                        Редактировать
                      </ButtonKit>
                      <ButtonKit onClick={() => deleteRoom()}>
                        Удалить
                      </ButtonKit>
                    </>
                  ) : (
                    <>
                      <ButtonKit>Принять</ButtonKit>
                      <ButtonKit>Следующая</ButtonKit>
                    </>
                  )}
                </GoGameRoomComponentControlButtonsStyled>
              )}
            </div>
          </GoGameRoomComponentContentStyled>
        </GoGameRoomComponentStyled>
      )}
    </>
  );
};

/*const getRoom = useCallback(async () => {
    axios
      .get(`/app/getRoom?gameName=${gameSelected}`)
      .then(({ data }) => {
        if (data) {
          console.log(data);
          setRoomInfo(data);
        } else {
          noGameRooms();
          dispatch({ type: "closeModal", data: "visibleGoGameModal" });
        }
      })
      .catch(({ data }) => {
        console.log(data);
      });
  }, [dispatch, gameSelected, noGameRooms]);*/

/*const userAccept = () => {
  axios
    .get(
      `/app/userAccept?idRoom=${roomInfo._id}&idUser=${
        userLogin ? userLogin : v4()
      }`
    )
    .then(({ data }) => {
      if (data) {
        if (data.message === "userConnected") {
          setAccepted(true);
        } else {
          console.log(data.message);
        }
      } else {
        noGameRooms();
        dispatch({ type: "closeModal", data: "visibleGoGameModal" });
      }
    })
    .catch(({ data }) => {
      console.log(data);
    });
};

useEffect(() => {
  visibleGoGameModal && getRoom();
}, [visibleGoGameModal, getRoom]);
*/
