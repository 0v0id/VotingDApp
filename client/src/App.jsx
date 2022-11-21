import { EthProvider } from "./contexts/EthContext";
import Intro from "./components/Intro/";
import RegisteringVoters from "./components/RegisteringVoters";
import RegisteringProposals from "./components/RegisteringProposals";
import VotingSession from "./components/VotingSession";
import Results from "./components/Results";
import Footer from "./components/Footer";
import "./App.css";

function App() {
  return (
    <EthProvider>
      <div id="App" >
        <div className="container">
          <Intro />
          <hr />
          <RegisteringVoters />
          <hr />
          <RegisteringProposals />
          <hr />
          <VotingSession />
          <hr />
          <Results />
          <hr />
          <Footer />
        </div>
      </div>
    </EthProvider>
  );
}

export default App;
