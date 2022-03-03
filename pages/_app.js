import { GlobalStyle, MainContainer, theme } from "../src/globalStyle";
import { Header } from "../src/components/header";
import { ThemeProvider } from "@mui/material";
import axios from "axios";
import getConfig from "next/config";
import { Provider } from "react-redux";
import { store } from "../src/toolKitRedux/index";
import io from "socket.io-client";

const MyApp = ({ Component, pageProps }) => {
  const { publicRuntimeConfig } = getConfig();
  const socket = io();
  console.log(socket, "socket");
  const ltroom = () => {
    socket.emit("disconnectFromRoom", {
      msg: "I im disconnected from server",
    });

    console.log(socket, "alterLeavesocket");
  };
  const ctroom = () => {
    socket.emit("connectToRoom", {
      msg: "I im connected to server",
    });

    console.log(socket, "alterConnectsocket");
  };
  socket.on("disconnectedFromRoom", ({ msg }) => {
    console.log(msg, "disconnectedFromRoom");
  });
  socket.on("connectedToRoom", ({ msg }) => {
    console.log(msg, "connectedToRoom");
  });

  axios.create({
    baseURL: publicRuntimeConfig.backendUrl,
  });

  return (
    <>
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <button
            onClick={() => {
              ltroom();
            }}
          >
            leadve
          </button>
          <button
            onClick={() => {
              ctroom();
            }}
          >
            connect
          </button>
          <GlobalStyle />
          <Header />
          <MainContainer>
            <Component {...pageProps} />
          </MainContainer>
        </Provider>
      </ThemeProvider>
    </>
  );
};
export default MyApp;
//todo либо играть либо личная комната хранить id (участники комнаты) TS soketIO
