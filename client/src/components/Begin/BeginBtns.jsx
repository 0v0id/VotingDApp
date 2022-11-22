import { useState } from "react";
import useEth from "../../contexts/EthContext/useEth";

function BeginBtns({status, setStatus}) {
  const { state: { contract, accounts } } = useEth();

  const start = async () => {
    const stat = await contract.methods.getStatus().call({ from: accounts[0] });
    setStatus(stat);
    console.log(status);
    console.log(stat);
  };

  return (
    <div className="btns">
      <button onClick={start}>
        Start
      </button>
    </div>
  );
}

export default BeginBtns;
