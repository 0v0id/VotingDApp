import useEth from "../../contexts/EthContext/useEth";
import Title from "./Title";
import RegisteringProposalsBtns from "./RegisteringProposalsBtns";
import NoticeNoArtifact from "./NoticeNoArtifact";
import NoticeWrongNetwork from "./NoticeWrongNetwork";

function RegisteringProposals({owner, setStatus}) {
  const { state } = useEth();

  const registeringProposals =
    <>
      <div className="btns-container">
        <RegisteringProposalsBtns owner={owner} setStatus={setStatus}/>
      </div>
    </>;

  return (
    <div className="phase">
      <Title />
      {
        !state.artifact ? <NoticeNoArtifact /> :
          !state.contract ? <NoticeWrongNetwork /> :
            registeringProposals
      }
      <hr />
    </div>
  );
}

export default RegisteringProposals;
