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
  const [owner, setOwner] = useState("");

  const begin =
    <>
      {
        status === "" ? <BeginBtns setOwner={setOwner} setStatus={setStatus}/> :
          status === "RegisteringVoters" ? <RegisteringVoters owner={owner} setStatus={setStatus}/> :
            status === "ProposalsRegistrationStarted" ? <RegisteringProposals owner={owner} setStatus={setStatus}/> :
              status === "ProposalsRegistrationEnded" || status === "VotingSessionStarted" ? 
                <VotingSession owner={owner} status={status} setStatus={setStatus}/> :
                  <Results owner={owner} status={status} setStatus={setStatus}/>
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
