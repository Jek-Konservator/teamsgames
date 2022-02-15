import React from "react";
import "./styled.css";
export const GameSelect = ({ onChangeFunction, width }) => {

    return (
    <div>
      <select
        style={{ width }}
        onChange={onChangeFunction}
        className="selectStyled"
        placeholder="игра"
      >
        {GAMES.map(({name}) => {
          return <option key={name} className="optionSelectStyled">{name}</option>;
        })}
      </select>
    </div>
  );
};

const GAMES = [
    { name: "" },
    { name: "Apex Legends" },
    { name: "Dota 2" },
    { name: "PUBG" },
    { name: "Genshin Impact" },
];