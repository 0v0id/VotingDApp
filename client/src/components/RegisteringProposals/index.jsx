import React, { useEffect, useState } from 'react';
import useEth from "../../contexts/EthContext/useEth";
import Title from "./Title";
import RegisteringProposalsBtns from "./RegisteringProposalsBtns";
import NoticeNoArtifact from "./NoticeNoArtifact";
import NoticeWrongNetwork from "./NoticeWrongNetwork";

function RegisteringProposals({owner, setStatus}) {
  const { state } = useEth();
  const { state: { contract } } = useEth();
  const [eventValue, setEventValue] = useState("");

  useEffect(
    () => { 
      ( 
        async function () {
          await contract.events.ProposalRegistered({fromBlock:"earliest"})
            .on('data', event => { setEventValue(event.returnValues.proposalId); })
            .on('changed', changed => console.log(changed))
            .on('error', err => console.log(err))
            .on('connected', str => console.log(str));
        }
        )();
    }, [contract]);

  const registeringProposals =
    <>
      <div className="btns-container">
        <RegisteringProposalsBtns owner={owner} setStatus={setStatus}/>
      </div>
      <p> {eventValue} </p>
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
