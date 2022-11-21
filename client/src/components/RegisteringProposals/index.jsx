import { useState } from "react";
import useEth from "../../contexts/EthContext/useEth";
import Title from "./Title";
import RegisteringProposalsBtns from "./RegisteringProposalsBtns";
import NoticeNoArtifact from "./NoticeNoArtifact";
import NoticeWrongNetwork from "./NoticeWrongNetwork";

function RegisteringProposals() {
  const { state } = useEth();

  const registeringProposals =
    <>
      <div className="btns-container">
        <RegisteringProposalsBtns />
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
    </div>
  );
}

export default RegisteringProposals;
