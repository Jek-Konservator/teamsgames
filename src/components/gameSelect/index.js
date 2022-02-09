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
        {[
          { name: "" },
          { name: "Apex Legends" },
          { name: "Dota 2" },
          { name: "PUBG" },
          { name: "Genshin Impact" },
        ].map((game) => {
          return <option key={game.name} className="optionSelectStyled">{game.name}</option>;
        })}
      </select>
    </div>
  );
};
