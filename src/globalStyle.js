import styled, { createGlobalStyle } from "styled-components";
import { createTheme } from "@mui/material";

export const GlobalStyle = createGlobalStyle`
  body{
    margin: 0;
  }
  #__next{
    width:100%; 
    height:100vh;
  }
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }
`;


export const theme = createTheme({
  palette: {
    primary: {
      main: "#5660C1 ",
    },
  },
});
