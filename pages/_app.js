import { GlobalStyle, MainContainer, theme } from "../src/globalStyle";
import { Header } from "../src/components/header";
import { ThemeProvider } from "@mui/material";
import axios from "axios";
import getConfig from "next/config";
import { Provider } from "react-redux";
import { store } from "../src/toolKitRedux/index";

const MyApp = ({ Component, pageProps }) => {
  const { publicRuntimeConfig } = getConfig();

  axios.create({
    baseURL: publicRuntimeConfig.backendUrl,
  });

  return (
    <>
      <ThemeProvider theme={theme}>
        <Provider store={store}>
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