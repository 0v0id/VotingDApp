import useEth from "../../contexts/EthContext/useEth";

function BeginBtns({setOwner, setStatus}) {
  const { state: { contract, accounts } } = useEth();

  const start = async () => {
    const stat = await contract.methods.getStatus().call({ from: accounts[0] });
    setStatus(stat);

    const ownr = await contract.methods.owner().call({from: accounts[0] });
    setOwner(ownr);
  };

  return (
    <div className="btns-container">
      <div className="btns">
        <button onClick={start}>
          Start
        </button>
      </div>
    </div>
  );
}

export default BeginBtns;
