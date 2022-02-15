import { Button } from "@mui/material";

import styled from "styled-components";

export const MainStyled = styled("div")`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
export const ButtonGoGameStyled = styled(Button)`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  background-color: rgba(86, 96, 193, 1);
  :hover {
    background-color: rgba(86, 96, 193, 0.8);
  }
  color: white;
  font-size: 25px;
  cursor: pointer;
  user-select: none;
`;
export const ButtonNewRoomStyled = styled(Button)`
  width: 150px;
  height: 50px;
  margin: 10px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  background-color: rgba(86, 96, 193, 1);
  :hover {
    background-color: rgba(86, 96, 193, 0.8);
  }
  color: white;
`;
