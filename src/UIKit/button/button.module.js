import styled from "styled-components";
import { Button } from "@mui/material";
export const ButtonStyled = styled(Button)`
  width: 150px;
  height: 40px;
  margin: 10px;
  border: none;
  border-radius: 5px;
  background-color: rgba(255, 255, 255, 1);
  :hover {
    background-color: rgba(255, 255, 255, 0.8);
  }
  font-size: 20px;
  cursor: pointer;
  user-select: none;
`;
