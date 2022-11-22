import React, { useState } from 'react';
import useEth from "../../contexts/EthContext/useEth";
import Title from "./Title";
import ResultsBtns from "./ResultsBtns";
import NoticeNoArtifact from "./NoticeNoArtifact";
import NoticeWrongNetwork from "./NoticeWrongNetwork";

function Results({status, setStatus}) {
  const { state } = useEth();

  const results =
    <>
      <div className="btns-container">
        <ResultsBtns status={status} setStatus={setStatus}/>
      </div>
    </>;

  return (
    <div className="phase">
      <Title />
      {
        !state.artifact ? <NoticeNoArtifact /> :
          !state.contract ? <NoticeWrongNetwork /> :
            results
      }
      <hr />
    </div>
  );
}

export default Results;
