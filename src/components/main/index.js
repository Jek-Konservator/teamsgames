import React, { useState } from "react";
import "./mainStyle.module";
import Link from "next/link";

import { GameSelect } from "../gameSelect";
import {
  ButtonGoGameStyled,
  ButtonNewRoomStyled,
  MainStyled,
} from "./mainStyle.module";
import { useSelector } from "react-redux";
import axios from "axios";
import { useRouter } from "next/router";

export const Main = () => {
  const [gameSelected, setGameSelected] = useState("");
  const { userType, userInfo } = useSelector(({ mainReducer }) => mainReducer);
  const router = useRouter();

  const goToUserRoom = () => {
    axios
      .get(`api/rooms/getUserRoom?userId=${userInfo._id}`)
      .then(({ data }) => router.push(`/gameRoom/${data.docs._id}`))
      .catch(({ data }) => console.log(data));
  };

  const goToGameRoom = () => {
    if (gameSelected !== "") {
      axios
        .get(`api/rooms/getRoom?gameName=${gameSelected}`)
        .then(({ data }) => router.push(`/gameRoom/${data.docs._id}`))
        .catch(({ data }) => console.log(data));
    } else {
      console.log("игра не выбрана");
    }
  };

  return (
    <MainStyled>
      <ButtonGoGameStyled onClick={() => goToGameRoom()}>
        Играть
      </ButtonGoGameStyled>
      <GameSelect
        sx={{ width: "200px" }}
        onChange={(e) => setGameSelected(e.target.innerText)}
      />
      {userInfo.idUserRoom ? (
        <ButtonNewRoomStyled
          onClick={() => {
            goToUserRoom();
          }}
        >
          Моя комната
        </ButtonNewRoomStyled>
      ) : (
        <Link href="newRoom">
          <ButtonNewRoomStyled>Создать комнату</ButtonNewRoomStyled>
        </Link>
      )}
    </MainStyled>
  );
};

//todo main е получает userId
