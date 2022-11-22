import React, { useEffect, useState } from 'react';
import useEth from "../../contexts/EthContext/useEth";
import Title from "./Title";
import VotingSessionBtns from "./VotingSessionBtns";
import NoticeNoArtifact from "./NoticeNoArtifact";
import NoticeWrongNetwork from "./NoticeWrongNetwork";

function VotingSession({owner, status, setStatus}) {
  const { state } = useEth();
  const { state: { contract } } = useEth();
  const [eventAddr, setEventAddr] = useState("");
  const [eventId, setEventId] = useState("");

  useEffect(
    () => { 
      ( 
        async function () {
          await contract.events.Voted({fromBlock:"earliest"})
            .on('data', event => { setEventAddr(event.returnValues.voterAddress); setEventId(event.returnValues.proposalId); })
            .on('changed', changed => console.log(changed))
            .on('error', err => console.log(err))
            .on('connected', str => console.log(str));
        }
        )();
    }, [contract]);

  const votingSession =
    <>
      <div className="btns-container">
        <VotingSessionBtns owner={owner} status={status} setStatus={setStatus}/>
      </div>
      {
        eventAddr !== "" ? <p> Address {eventAddr} voted for the proposal : {eventId} </p> :
        <></>
      }
      
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
