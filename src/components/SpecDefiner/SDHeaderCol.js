import React from "react";
import styles from "./common.less";

const EGHeaderCol = ({ headerStyle, displayText, colWidth }) => {
  const hoverStyle = {
    width : colWidth,
  };

  return (
    <span
      className={styles.col}
      style={{ ...hoverStyle, ...headerStyle }}
    >
      <div className={styles.cell}>
        <span>{displayText}</span>
      </div>
    </span>
  );
}

EGHeaderCol.propTypes = {
  headerStyle : React.PropTypes.object,
  displayText : React.PropTypes.string,
  colWidth    : React.PropTypes.number,
};

export { EGHeaderCol };
