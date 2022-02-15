import styled, { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  body{
    margin: 0;
  }
  #__next{
    width:100%;
    height:100vh;
  }
`;
export const MainContainer = styled("div")`
  width: 100%;
  height: calc(100vh - 50px);
`;
