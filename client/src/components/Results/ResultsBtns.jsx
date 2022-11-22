import React, { useState, useRef } from 'react';
import useEth from "../../contexts/EthContext/useEth";

function ResultsBtns({owner, status, setStatus}) {
  const spanEle = useRef(null);
  const { state: { contract, accounts } } = useEth();
  const [winnindId, setWinnindId] = useState("?");

  const tally = async () => {
    await contract.methods.nextPhase().send({ from: accounts[0] });
    const winId = await contract.methods.getWinner().call({ from: accounts[0] });
    setWinnindId(winId);
    const stat = await contract.methods.getStatus().call({ from: accounts[0] });
    setStatus(stat);
  };

  const displayWinner = async () => {
    const winId = await contract.methods.getWinner().call({ from: accounts[0] });
    setWinnindId(winId);
  };

  return (
    <div className="btns">
      {
        owner === accounts[0] && status === "VotingSessionEnded" ? <button onClick={tally}> Tally </button> :
          <></>
      }
      
      {
        status === "VotesTallied" ? <button onClick={displayWinner}> Display winner </button> :
          <></>
      }
      {
        status === "VotesTallied" ? 
          <span className="secondary-color" ref={spanEle}>
            <strong>{winnindId}</strong>
          </span> :
            <></>
      }
    </div>
  );
}

export default ResultsBtns;
