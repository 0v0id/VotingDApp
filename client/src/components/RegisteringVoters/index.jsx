import useEth from "../../contexts/EthContext/useEth";
import Title from "./Title";
import React, { useState, useEffect } from 'react';
import NotOwner from "./NotOwner";
import RegisteringVotersBtns from "./RegisteringVotersBtns";
import NoticeNoArtifact from "./NoticeNoArtifact";
import NoticeWrongNetwork from "./NoticeWrongNetwork";

function RegisteringVoters({owner, setStatus}) {
  const { state: { contract, accounts } } = useEth();
  const { state } = useEth();
  const [eventValue, setEventValue] = useState("");

  useEffect(
    () => { 
      ( 
        async function () {
          await contract.events.VoterRegistered({fromBlock:"earliest"})
            .on('data', event => { setEventValue(event.returnValues.voterAddress); })
            .on('changed', changed => console.log(changed))
            .on('error', err => console.log(err))
            .on('connected', str => console.log(str));
        }
        )();
    }, [contract]);

  const registeringVoters =
    <>
      {
        owner === accounts[0] ? <RegisteringVotersBtns setStatus={setStatus}/> :
          <NotOwner />
      }
      {
        eventValue !== "" ? <p> {eventValue} has been registered </p> :
          <></>
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
