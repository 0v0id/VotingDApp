import { EthProvider } from "./contexts/EthContext";
import Intro from "./components/Intro/";
import Begin from "./components/Begin/";
import Footer from "./components/Footer";
import "./App.css";

function App() {
  return (
    <EthProvider>
      <div id="App" >
        <div className="container">
          <Intro />
          <Begin />
          <Footer />
        </div>
      </div>
    </EthProvider>
  );
}

export default App;
