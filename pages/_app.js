import { GlobalStyle, MainContainer } from "../src/globalStyle";
import { Header } from "../src/components/header";

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <GlobalStyle />
      <Header />
      <MainContainer>
        <Component {...pageProps} />
      </MainContainer>
    </>
  );
}
