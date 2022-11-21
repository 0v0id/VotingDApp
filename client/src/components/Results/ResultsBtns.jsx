import { useState, useRef } from "react";
import useEth from "../../contexts/EthContext/useEth";

function ResultsBtns() {
  const spanEle = useRef(null);
  const { state: { contract, accounts } } = useEth();
  const [inputValue, setInputValue] = useState("");
  const [winnindId, setWinnindId] = useState("?");

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
    const winId = await contract.methods.getWinner().call({ from: accounts[0] });
    setWinnindId(winId);
    console.log(winId);
    console.log(winnindId);
  };

  return (
    <div className="btns">
      <button onClick={tally}>
        Tally
      </button>

      <span className="secondary-color" ref={spanEle}>
        <strong>{winnindId}</strong>
      </span>
      
    </div>
  );
}

export default ResultsBtns;
