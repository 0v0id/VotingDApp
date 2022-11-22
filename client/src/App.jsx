import { EthProvider } from "./contexts/EthContext";
import Intro from "./components/Intro/";
import Begin from "./components/Begin/";
import "./App.css";

function App() {
  return (
    <EthProvider>
      <div id="App" >
        <div className="container">
          <Intro />
          <Begin />
        </div>
      </div>
    </EthProvider>
  );
}

export default App;
