import React, { useState } from 'react';
import useEth from "../../contexts/EthContext/useEth";

function RegisteringProposalsBtns({owner, setStatus}) {
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

  const registerProposal = async e => {
    if (e.target.tagName === "INPUT") {
      return;
    }
    if (inputValue === "") {
      alert("Please enter a proposal description.");
      return;
    }
    const Voter = await contract.methods.getVoter(accounts[0]).call({ from: accounts[0] });
    setIsRegisteredVoter(Voter.isRegistered);
    if (!Voter.isRegistered) {
      alert("You are not a registered Voter.");
      return;
    }
    await contract.methods.registerProposal(inputValue).send({ from: accounts[0] });
  };

  const nextPhase = async () => {
    await contract.methods.nextPhase().send({ from: accounts[0] });
    const stat = await contract.methods.getStatus().call({ from: accounts[0] });
    setStatus(stat);
  };

  return (
    <div className="btns">
      <button onClick={start}> Start </button>
      {
        isRegisteredVoter ? 
          <div onClick={registerProposal} className="input-btn">
            registerProposal
            <input
              type="text"
              placeholder="description"
              value={inputValue}
              onChange={handleInputChange}
            />
          </div> :
        <></>
      }
      {
        owner === accounts[0] ? <button onClick={nextPhase}> nextPhase </button> :
          <></>
      }
    </div>
  );
}

export default RegisteringProposalsBtns;
