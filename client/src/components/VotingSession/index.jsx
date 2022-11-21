import { useState } from "react";
import useEth from "../../contexts/EthContext/useEth";
import Title from "./Title";
import VotingSessionBtns from "./VotingSessionBtns";
import NoticeNoArtifact from "./NoticeNoArtifact";
import NoticeWrongNetwork from "./NoticeWrongNetwork";

function VotingSession() {
  const { state } = useEth();

  const votingSession =
    <>
      <div className="btns-container">
        <VotingSessionBtns />
      </div>
    </>;

  return (
    <div className="phase">
      <Title />
      {
        !state.artifact ? <NoticeNoArtifact /> :
          !state.contract ? <NoticeWrongNetwork /> :
            votingSession
      }
    </div>
  );
}

export default VotingSession;
