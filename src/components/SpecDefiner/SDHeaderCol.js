import React from "react";
import styles from "./common.less";

const SDHeaderCol = ({ headerStyle, displayText, colWidth }) => {
  const hoverStyle = {
    width : colWidth,
  };

  return (
    <span
      className={styles.col}
      style={{ ...hoverStyle, ...headerStyle }}
    >
      <div style={{ fontWeight : 700 }} className={styles.cell}>
        <span>{displayText}</span>
      </div>
    </span>
  );
};

SDHeaderCol.propTypes = {
  headerStyle : React.PropTypes.object,
  displayText : React.PropTypes.string,
  colWidth    : React.PropTypes.number,
};

export { SDHeaderCol };
