import React, {useCallback, useEffect, useState} from "react";
import "./styled.css";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Loader } from "../loader";

export const UserRoomModal = () => {
  const [roomInfo, setRoomInfo] = useState({ users: [] });

  const dispatch = useDispatch();
  const { userLogin,idUserRoom,visibleUserRoomModal } = useSelector(
    ({ mainReducer }) => mainReducer
  );
  const getRooms = useCallback(() => {
    axios
      .get(`/app/getRoom?idRoom=${idUserRoom}`)
      .then(({ data }) => {
        console.log(data);
        setRoomInfo(data);
      })
      .catch(({ data }) => {
        console.log(data);
      });
  },[idUserRoom]);
  const deleteRoom = () => {
    axios
      .get(
        `/app/deleteRoom?idRoom=${idUserRoom}&loginOwner=${userLogin}`
      )
      .then(({ data }) => {
        if (data.message === "roomDelete") {
          localStorage.removeItem("idUserRoom");
          dispatch({ type: "closeModal", data: "visibleUserRoomModal" })
          dispatch({ type: "deleteRoom"});
         ;
        } else {
          console.log(data);
        }
      })
      .catch(({ data }) => {
        console.log(data);
      });
  };

  useEffect(() => {
    visibleUserRoomModal && getRooms();
  }, [visibleUserRoomModal,getRooms]);

  return (
    <>
      {visibleUserRoomModal && (
        <>
          {roomInfo ? (
            <div className="goGameModalStyled">
              <button
                onClick={() => {
                  dispatch({
                    type: "closeModal",
                    data: "visibleUserRoomModal",
                  });
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
                <div
                  style={{ color: "white", margin: "0 10px" }}
                >{`${roomInfo.users.length}/${roomInfo.maxUsers}`}</div>
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
                  <div className="messageToConnectStyled">
                    {roomInfo.message}
                  </div>
                  <div className="roomControlButtonsStyled">
                    <button
                      onClick={() => {
                        deleteRoom();
                      }}
                      className="controlButtonStyled"
                    >
                      Удалить комнату
                    </button>
                  </div>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <Loader />
          )}
        </>
      )}
    </>
  );
};
