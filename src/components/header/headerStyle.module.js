import styled from "styled-components";
import { Button } from "@mui/material";

export const HeaderStyled = styled("div")`
  width: 100%;
  height: 50px;
  padding: 0 10px;
  background-color: #5660C1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
`;
export const ImageLogoStyled = styled("div")`
  width: 160px;
`;

export const ButtonProfileStyled = styled(Button)`
  width: 100px;
  height: 30px;
  margin-left: 10px;
  border: none;
  border-radius: 10px;
  background-color: rgba(157, 226, 241, 1);
  :hover {
    background-color: rgba(157, 226, 241, 0.8);
  }
  color: #5660C1;
  cursor: pointer;
`;
