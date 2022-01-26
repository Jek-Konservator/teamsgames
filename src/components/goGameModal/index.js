import React, { useState } from "react";
import "./styled.css";

export const GoGameModal = () => {
  const [accepted, setAccepted] = useState(false);
  return (
    <div className="goGameModalStyled">
      <div>
        <div className="modalInfoStyled">
          <div className="roomNameStyled">Лучшая комната в мире </div>
          <div className="roomGameStyled">Apex Legends</div>
        </div>
        <div className="roomUsersStyled">
          {[{ name: "Roman" }, { name: "Oleg" }].map((user) => {
            return (
              <div className="roomUsersInfoStyled">
                <div>{user.name}</div>
              </div>
            );
          })}
        </div>
      </div>
      <div>
        <div>
          {accepted ? (
            <div className="messageToConnectStyled">@lalalalalla</div>
          ) : (
            <div className="roomControlButtonsStyled">
              <button
                onClick={() => setAccepted(true)}
                className="controlButtonStyled"
              >
                Принять
              </button>
              <button className="controlButtonStyled">Следующая</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
