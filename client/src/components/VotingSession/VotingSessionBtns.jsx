import React, { useState } from 'react';
import useEth from "../../contexts/EthContext/useEth";

function VotingSessionBtns({owner, status, setStatus}) {
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

  const nextPhase = async () => {
    await contract.methods.nextPhase().send({ from: accounts[0] });
    const stat = await contract.methods.getStatus().call({ from: accounts[0] });
    setStatus(stat);
  };

  return (
    <div className="btns">
      {
        owner === accounts[0] && status === "ProposalsRegistrationEnded" ? <button onClick={nextPhase}> nextPhase </button> :
          <></>
      }

      {
        status === "VotingSessionStarted" ?
        <div onClick={vote} className="input-btn">
          vote
          <input
            type="text"
            placeholder="id"
            value={inputValue}
            onChange={handleInputChange}
          />
        </div> :
          <></>
      }
      
      {
        status === "VotingSessionStarted" && owner === accounts[0] ? <button onClick={nextPhase}> nextPhase </button> :
          <></>
      }
    </div>
  );
}

export default VotingSessionBtns;
