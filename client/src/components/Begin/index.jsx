import React, { useState, useEffect } from 'react';
import useEth from "../../contexts/EthContext/useEth";
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

  useEffect(() => {
    document.title = `Voting : ${status}`;
  });

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
