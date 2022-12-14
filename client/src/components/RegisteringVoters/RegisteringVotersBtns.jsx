import React, { useState } from 'react';
import useEth from "../../contexts/EthContext/useEth";

function RegisteringVotersBtns({setStatus}) {
  const { state: { contract, accounts } } = useEth();
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = e => {
    setInputValue(e.target.value);
  };

  const registerVoter = async e => {
    if (e.target.tagName === "INPUT") {
      return;
    }
    if (inputValue === "") {
      alert("Please enter an address.");
      return;
    }
    if (!inputValue.startsWith("0x") || inputValue.length !== 42) {
      alert("Please enter a correct address.");
      return;
    }
    await contract.methods.registerVoter(inputValue).send({ from: accounts[0] });
  };

  const nextPhase = async () => {
    await contract.methods.nextPhase().send({ from: accounts[0] });
    const stat = await contract.methods.getStatus().call({ from: accounts[0] });
    setStatus(stat);
  };

  return (
    <div className="btns-container">
      <div className="btns">
        <div onClick={registerVoter} className="input-btn">
          Register a voter &nbsp;
          <input
            type="text"
            placeholder="address"
            value={inputValue}
            onChange={handleInputChange}
          />
        </div>

        <button onClick={nextPhase}>
          Launch proposals registration phase
        </button>
      </div>
    </div>
  );
}

export default RegisteringVotersBtns;
