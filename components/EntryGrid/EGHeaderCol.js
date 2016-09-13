/**
 * Created by sharavan on 01/06/16.
 */
import React from "react";
import styles from "./EGHeaderCol.less";

const EGHeaderCol = props => {
  const { headerStyle, displayText, colWidth } = props;
  const hoverStyle = { width : colWidth };

  return (
    <div
      className={styles.col}
      style={{ ...hoverStyle, ...headerStyle }}
    >
      <div className={styles.cell} title={displayText}>{displayText}</div>
    </div>
  );
};

EGHeaderCol.propTypes = {
  headerStyle : React.PropTypes.object,
  displayText : React.PropTypes.string.isRequired,
  colWidth    : React.PropTypes.number,
};
export { EGHeaderCol };
