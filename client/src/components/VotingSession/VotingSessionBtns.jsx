import React, { useState } from 'react';
import useEth from "../../contexts/EthContext/useEth";

function VotingSessionBtns({owner, status, setStatus}) {
  const { state: { contract, accounts } } = useEth();
  const [inputValue, setInputValue] = useState("");
  const [isRegisteredVoter, setIsRegisteredVoter] = useState(false);

  const handleInputChange = e => {
    setInputValue(e.target.value);
  };  

  const start = async () => {
    const Voter = await contract.methods.getVoter(accounts[0]).call({ from: accounts[0] });
    setIsRegisteredVoter(Voter.isRegistered);
    if (!Voter.isRegistered) {
      alert("You are not a registered Voter.");
      return;
    }
  };

  const vote = async e => {
    if (e.target.tagName === "INPUT") {
      return;
    }
    if (inputValue === "") {
      alert("Please enter an id.");
      return;
    }
    const Voter = await contract.methods.getVoter(accounts[0]).call({ from: accounts[0] });
    setIsRegisteredVoter(Voter.isRegistered);
    if (!Voter.isRegistered) {
      alert("You are not a registered Voter.");
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
          <button onClick={start}> Start </button> :
            <></>
      }
      
      {
        status === "VotingSessionStarted" && isRegisteredVoter ?
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
