import React, { useEffect, useState } from "react";
import "./gameRoomStyle.module";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

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

import { EditRoomComponent } from "../editRoomComponent";
import { useRouter } from "next/router";
import { getCookie } from "cookies-next";
import { userRoomDelete } from "../../../toolKitRedux/toolKitSlice";
import io from "socket.io-client";

export const GameRoomComponent = ({ roomInfo }) => {
  const [componentRoomInfo, setComponentRoomInfo] = useState(roomInfo);
  const [editRoom, setEditRoom] = useState(false);
  const { userInfo, gameSelected } = useSelector(
    ({ mainReducer }) => mainReducer
  );
  const dispatch = useDispatch();
  const router = useRouter();
  const socket = io();
  const deleteRoom = () => {
    axios
      .delete(
        `/api/rooms/deleteRoom?idRoom=${
          componentRoomInfo._id
        }&ownerId=${getCookie("ghostId")}`
      )
      .then(({ data }) => {
        if (data.status === "ok") {
          dispatch(userRoomDelete());
          socket.emit("roomDelete", { idRoom: componentRoomInfo._id });
        } else {
          console.log(data.message);
        }
      })
      .catch(() => console.log(Error));
  };

  const goToGameRoom = () => {
    if (gameSelected !== "") {
      axios
        .get(
          `/api/rooms/getRooms?gameName=${gameSelected}&roomId=${componentRoomInfo._id}`
        )
        .then(({ data }) => router.push(`/gameRoom/${data._id}`))
        .catch(({ data }) => console.log(data));
    } else {
      console.log("игра не выбрана");
      router.push("/")
    }
  };

  const acceptRoom = async () => {
    socketSubscriptions();
    socket.on("userAccepted", ({ idRoom }) => {
      socket.emit("newUserAccepted", {
        idRoom,
        idUser: getCookie("ghostId"),
      });
    });
  };

  const socketSubscriptions = () => {
    socket.emit("acceptRoom", { idRoom: componentRoomInfo._id });
    socket.on("updateUsers", () => {
      axios(`/api/rooms/getRoom?roomId=${componentRoomInfo._id}`).then(
        ({ data }) => {
          setComponentRoomInfo({
            ...componentRoomInfo,
            users: data.docs.users,
          });
        }
      );
    });
    socket.on("exitedTheRoom", () => {
      router.push("/");
    });
    socket.on("roomDelete", () => {
      router.push("/");
    });
    socket.on("editedRoom", () => {
      console.log(555);
      axios(`/api/rooms/getRoom?roomId=${componentRoomInfo._id}`).then(
        ({ data }) => {
          setComponentRoomInfo({
            ...componentRoomInfo,
            gameName: data.docs.gameName,
            maxUsers: data.docs.maxUsers,
            message: data.docs.message,
            roomName: data.docs.roomName,
          });
          setEditRoom(false);
        }
      );
    });
  };

  const exitTheRoom = async () => {
    if (userInfo._id === roomInfo.ownerId) {
      router.push("/");
    } else {
      socket.emit("exitTheRoom", {
        idRoom: componentRoomInfo._id,
        idUser: getCookie("ghostId"),
      });
    }
  };

  const funcEditRoom = async () => {
    socket.emit("editRoom", {
      idRoom: roomInfo._id,
    });
  };

  const roomOwnerLogin = async () => {
    socketSubscriptions();
    socket.on("userAccepted", ({ idRoom }) => {
      console.log("room Owner Login", idRoom);
    });
  };

  useEffect(() => {
    userInfo._id === roomInfo.ownerId && roomOwnerLogin();
    componentRoomInfo.users.includes(userInfo._id) &&
      componentRoomInfo.ownerId !== userInfo._id &&
      socketSubscriptions();
  }, [userInfo]);

  useEffect(() => {
    JSON.stringify(componentRoomInfo) !== JSON.stringify(roomInfo) &&
      setComponentRoomInfo(roomInfo);
  }, [roomInfo]);

  return (
    <>
      {editRoom ? (
        <EditRoomComponent
          funcEditRoom={funcEditRoom}
          roomEditInfo={componentRoomInfo}
        />
      ) : (
        <GoGameRoomComponentStyled>
          <GoGameRoomComponentContentStyled>
            <ButtonGoMainIcon
              onClick={() => {
                exitTheRoom();
              }}
            />
            <div>
              <GoGameRoomComponentInfoStyled>
                <div>{componentRoomInfo.roomName}</div>
                <div>{componentRoomInfo.gameName}</div>
              </GoGameRoomComponentInfoStyled>
              <GoGameRoomComponentNumberUsersStyled>
                {`${componentRoomInfo.users.length}/${componentRoomInfo.maxUsers}`}
              </GoGameRoomComponentNumberUsersStyled>
              <GoGameRoomComponentUsersStyled>
                {componentRoomInfo.users.map((user) => {
                  return (
                    <GoGameRoomComponentUsersInfoStyled key={user}>
                      <div>GHOST</div>
                    </GoGameRoomComponentUsersInfoStyled>
                  );
                })}
              </GoGameRoomComponentUsersStyled>
            </div>
            <div>
              {componentRoomInfo.users.includes(userInfo._id) &&
              componentRoomInfo.ownerId !== userInfo._id ? (
                <GoGameRoomComponentMessageToConnectStyled>
                  {componentRoomInfo.message}
                  <ButtonKit
                    onClick={() => {
                      exitTheRoom();
                    }}
                  >
                    Выход
                  </ButtonKit>
                </GoGameRoomComponentMessageToConnectStyled>
              ) : (
                <GoGameRoomComponentControlButtonsStyled>
                  {userInfo._id === componentRoomInfo.ownerId ? (
                    <>
                      <ButtonKit onClick={() => setEditRoom(true)}>
                        Редактировать
                      </ButtonKit>
                      <ButtonKit onClick={() => deleteRoom()}>
                        Удалить
                      </ButtonKit>
                    </>
                  ) : (
                    <>
                      <ButtonKit
                        onClick={() => {
                          acceptRoom();
                        }}
                      >
                        Принять
                      </ButtonKit>
                      <ButtonKit onClick={() => goToGameRoom()}>
                        Следующая
                      </ButtonKit>
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
          setcomponentRoomInfo(data);
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
      `/app/userAccept?idRoom=${componentRoomInfo._id}&idUser=${
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
