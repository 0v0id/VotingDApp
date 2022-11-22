import React, { useState } from 'react';
import useEth from "../../contexts/EthContext/useEth";
import Title from "./Title";
import VotingSessionBtns from "./VotingSessionBtns";
import NoticeNoArtifact from "./NoticeNoArtifact";
import NoticeWrongNetwork from "./NoticeWrongNetwork";

function VotingSession({status, setStatus}) {
  const { state } = useEth();

  const votingSession =
    <>
      <div className="btns-container">
        <VotingSessionBtns status={status} setStatus={setStatus}/>
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
      <hr />
    </div>
  );
}

export default VotingSession;
