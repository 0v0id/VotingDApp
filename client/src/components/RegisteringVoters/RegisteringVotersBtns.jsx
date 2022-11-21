import { useState } from "react";
import useEth from "../../contexts/EthContext/useEth";

function RegisteringVotersBtns() {
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
    const status = await contract.methods.getStatus().call({ from: accounts[0] });
  };

  return (
    <div className="btns">
      <div onClick={registerVoter} className="input-btn">
        registerVoter
        <input
          type="text"
          placeholder="address"
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

export default RegisteringVotersBtns;
