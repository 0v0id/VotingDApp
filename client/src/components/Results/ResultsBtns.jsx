import { useState } from "react";
import useEth from "../../contexts/EthContext/useEth";

function ResultsBtns() {
  const { state: { contract, accounts } } = useEth();
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = e => {
    setInputValue(e.target.value);
  };

  const vote = async e => {
    if (e.target.tagName === "INPUT") {
      return;
    }
    if (inputValue === "") {
      alert("Please enter an id.");
      return;
    }
    await contract.methods.vote(inputValue).send({ from: accounts[0] });
  };

  const tally = async () => {
    await contract.methods.nextPhase().send({ from: accounts[0] });
    const status = await contract.methods.getStatus().call({ from: accounts[0] });
    const winnindId = await contract.methods.getWinner().call({ from: accounts[0] });
  };

  return (
    <div className="btns">
      <button onClick={tally}>
        Tally
      </button>

      
    </div>
  );
}

export default ResultsBtns;
