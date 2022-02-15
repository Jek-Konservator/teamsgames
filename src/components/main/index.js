import React from "react";
import "./mainStyle.module";
import Link from "next/link";

import { GameSelect } from "../gameSelect";
import {
  ButtonGoGameStyled,
  ButtonNewRoomStyled,
  MainStyled,
} from "./mainStyle.module";
import { ButtonKit } from "../../UIKit/button";

export const Main = () => {
  const noGameRooms = () => {
    console.log("no Game Rooms");
  };

  return (
    <MainStyled>
      <ButtonGoGameStyled className="buttonGoGameStyled">
        Играть
      </ButtonGoGameStyled>

      <GameSelect sx={{ width: "200px" }} />
      <Link href="newRoom">
        <ButtonNewRoomStyled className="buttonNewRoomStyled">
          Создать комнату
        </ButtonNewRoomStyled>
      </Link>
    </MainStyled>
  );
};
//todo сделать тему для MUI
