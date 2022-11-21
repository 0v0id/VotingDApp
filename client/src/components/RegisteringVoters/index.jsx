import { useState } from "react";
import useEth from "../../contexts/EthContext/useEth";
import Title from "./Title";
import RegisteringVotersBtns from "./RegisteringVotersBtns";
import NoticeNoArtifact from "./NoticeNoArtifact";
import NoticeWrongNetwork from "./NoticeWrongNetwork";

function RegisteringVoters() {
  const { state } = useEth();

  const registeringVoters =
    <>
      <div className="btns-container">
        <RegisteringVotersBtns />
      </div>
    </>;

  return (
    <div className="phase">
      <Title />
      {
        !state.artifact ? <NoticeNoArtifact /> :
          !state.contract ? <NoticeWrongNetwork /> :
            registeringVoters
      }
    </div>
  );
}

export default RegisteringVoters;
