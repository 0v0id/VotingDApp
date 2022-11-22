import React, { useState, useRef } from 'react';
import useEth from "../../contexts/EthContext/useEth";

function ResultsBtns({status, setStatus}) {
  const spanEle = useRef(null);
  const { state: { contract, accounts } } = useEth();
  const [winnindId, setWinnindId] = useState("?");

  const tally = async () => {
    await contract.methods.nextPhase().send({ from: accounts[0] });
    const winId = await contract.methods.getWinner().call({ from: accounts[0] });
    setWinnindId(winId);
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
