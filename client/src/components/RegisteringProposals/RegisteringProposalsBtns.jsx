import React, { useState } from 'react';
import useEth from "../../contexts/EthContext/useEth";

function RegisteringProposalsBtns({status, setStatus}) {
  const { state: { contract, accounts } } = useEth();
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = e => {
    setInputValue(e.target.value);
  };

  const registerProposal = async e => {
    if (e.target.tagName === "INPUT") {
      return;
    }
    if (inputValue === "") {
      alert("Please enter a proposal description.");
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
      <div onClick={registerProposal} className="input-btn">
        registerProposal
        <input
          type="text"
          placeholder="description"
          value={inputValue}
          onChange={handleInputChange}
        />
      </div>

      <button onClick={nextPhase}>
        nextPhase
      </button>
    </div>
  );
}

export default RegisteringProposalsBtns;
