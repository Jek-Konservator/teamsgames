import "./App.css";
import { Main } from "./components/main";
import { Header } from "./components/header";
import axios from "axios";

axios.defaults.baseURL="http://localhost:3001"

function App() {
  return (
    <div className="App">
      <Header />
      <Main />
    </div>
  );
}

export default App;
