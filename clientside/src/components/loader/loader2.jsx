import React from "react";
import { css } from "@emotion/react";
import { HashLoader } from "react-spinners";

// Can be a string as well. Need to ensure each key-value pair ends with ;
const override = css`
  display: block;
  margin: 0 auto;
  width: 160px;
  height: 160px;
  border-color: red;
`;

function Loader2(props) {
  let color = "#000000";

  return (
    <div className="sweet-loading center-of-page">
      <HashLoader
        color={color}
        loading={props.isRendering}
        css={override}
        size={150}
      />
    </div>
  );
}

export default Loader2;
