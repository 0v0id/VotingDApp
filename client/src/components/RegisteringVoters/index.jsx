import useEth from "../../contexts/EthContext/useEth";
import Title from "./Title";
import NotOwner from "./NotOwner";
import RegisteringVotersBtns from "./RegisteringVotersBtns";
import NoticeNoArtifact from "./NoticeNoArtifact";
import NoticeWrongNetwork from "./NoticeWrongNetwork";

function RegisteringVoters({owner, setStatus}) {
  const { state: { accounts } } = useEth();
  const { state } = useEth();

  const registeringVoters =
    <>
      {
        owner === accounts[0] ? <RegisteringVotersBtns setStatus={setStatus}/> :
          <NotOwner />
      }
    </>;

  return (
    <div className="phase">
      <Title />
      {
        !state.artifact ? <NoticeNoArtifact /> :
          !state.contract ? <NoticeWrongNetwork /> :
            registeringVoters
      }
      <hr />
    </div>
  );
}

export default RegisteringVoters;
