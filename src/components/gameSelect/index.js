import React from "react";
import "./gameSelectStyle.module";
import { GameAutocompleteStyled } from "./gameSelectStyle.module";
import { TextField } from "@mui/material";
export const GameSelect = ({ onChangeFunction, sx }) => {
  return (
    <>
      <GameAutocompleteStyled

          sx={sx}
        options={GAMES}
        renderInput={(params) => <TextField {...params} placeholder="Игра" />}
      />
    </>
  );
};

const GAMES = ["Apex Legends", "Dota 2", "PUBG", "Genshin Impact"];
