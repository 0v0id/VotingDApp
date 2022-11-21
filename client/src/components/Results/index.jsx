import { useState } from "react";
import useEth from "../../contexts/EthContext/useEth";
import Title from "./Title";
import ResultsBtns from "./ResultsBtns";
import NoticeNoArtifact from "./NoticeNoArtifact";
import NoticeWrongNetwork from "./NoticeWrongNetwork";

function Results() {
  const { state } = useEth();

  const results =
    <>
      <div className="btns-container">
        <ResultsBtns />
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
    </div>
  );
}

export default Results;
