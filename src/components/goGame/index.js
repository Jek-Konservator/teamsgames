import React, { useCallback, useEffect, useState } from "react";
import "./goGameModal.module.css";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { v4 } from "uuid";

export const GoGameModal = ({ noGameRooms }) => {
  const [accepted, setAccepted] = useState(false);
  const [roomInfo, setRoomInfo] = useState(false);

  const dispatch = useDispatch();
  const { userLogin, gameSelected, visibleGoGameModal } = useSelector(
    ({ mainReducer }) => mainReducer
  );
  const getRoom = useCallback(async () => {
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
  }, [dispatch, gameSelected, noGameRooms]);


  const userAccept = () => {
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

  return (
    <>
      {visibleGoGameModal && roomInfo && (
        <div className="goGameModalStyled">
          <button
            onClick={() => {
              dispatch({ type: "closeModal", data: "visibleGoGameModal" });
              setRoomInfo(false);
            }}
            className="buttonCloseModal "
          >
            X
          </button>
          <div>
            <div className="modalInfoStyled">
              <div className="roomNameStyled">{roomInfo.roomName}</div>
              <div className="roomGameStyled">{roomInfo.gameName}</div>
            </div>
            <div className="roomUsersStyled">
              {roomInfo.users.map((user) => {
                return (
                  <div key={user} className="roomUsersInfoStyled">
                    <div>{user}</div>
                  </div>
                );
              })}
            </div>
          </div>
          <div>
            <div>
              {accepted ? (
                <div className="messageToConnectStyled">{roomInfo.message}</div>
              ) : (
                <div className="roomControlButtonsStyled">
                  <button
                    onClick={() => userAccept()}
                    className="controlButtonStyled"
                  >
                    Принять
                  </button>
                  <button
                    onClick={() => {
                      getRoom();
                    }}
                    className="controlButtonStyled"
                  >
                    Следующая
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
