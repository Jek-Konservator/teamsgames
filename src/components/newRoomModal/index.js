import React from "react";
import "./styled.css";

export const NewRoomModal = () => {
  return (
    <div className="newRoomModalStyled">
      <div className="inputsStyled">
        <input className="inputStyled" type="text" placeholder="Название комнаты" />
        <select className="selectStyled" placeholder="игра">
          {[
            { name: "Apex Legends" },
            { name: "Dota 2" },
            { name: "PUBG" },
            { name: "Genshin Impact" },
          ].map((game) => {
            return <option className="optionSelectStyled">{game.name}</option>;
          })}
        </select>
        <input className="inputStyled" type="number" placeholder="Количество участников комнаты" />
      </div>

      <div className="controlButtonsStyled">
        <button className="controlButtonStyled">Создать</button>
        <button className="controlButtonStyled">Отменить</button>
      </div>
    </div>
  );
};
