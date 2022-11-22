import React, { useState } from 'react';
import useEth from "../../contexts/EthContext/useEth";
import Title from "./Title";
import RegisteringVotersBtns from "./RegisteringVotersBtns";
import NoticeNoArtifact from "./NoticeNoArtifact";
import NoticeWrongNetwork from "./NoticeWrongNetwork";

function RegisteringVoters({status, setStatus}) {
  const { state } = useEth();

  const registeringVoters =
    <>
      <div className="btns-container">
        <RegisteringVotersBtns status={status} setStatus={setStatus}/>
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
      <hr />
    </div>
  );
}

export default RegisteringVoters;
