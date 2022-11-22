import React, { useState } from 'react';
import useEth from "../../contexts/EthContext/useEth";
import Title from "./Title";
import BeginBtns from "./BeginBtns";
import RegisteringVoters from "../RegisteringVoters";
import RegisteringProposals from "../RegisteringProposals";
import VotingSession from "../VotingSession";
import Results from "../Results";
import NoticeNoArtifact from "./NoticeNoArtifact";
import NoticeWrongNetwork from "./NoticeWrongNetwork";

function Begin() {
  const { state } = useEth();
  const [status, setStatus] = useState("");

  const begin =
    <>
      {
        status === "" ? 
          <div className="btns-container">
            <BeginBtns status={status} setStatus={setStatus}/>
          </div> :
          status === "RegisteringVoters" ? <RegisteringVoters status={status} setStatus={setStatus}/> :
            status === "ProposalsRegistrationStarted" ? <RegisteringProposals status={status} setStatus={setStatus}/> :
              status === "ProposalsRegistrationEnded" || status === "VotingSessionStarted" ? 
                <VotingSession status={status} setStatus={setStatus}/> :
                  <Results status={status} setStatus={setStatus}/>
      }   
    </>;

  return (
    <div className="phase">
      <Title />
      {
        !state.artifact ? <NoticeNoArtifact /> :
          !state.contract ? <NoticeWrongNetwork /> :
            begin
      }
      <hr />
    </div>
  );
}

export default Begin;
