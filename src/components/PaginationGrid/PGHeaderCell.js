import React from "react";
import styles from "./common.less";

const PGHeaderCell = props => {
  const { headerStyle, displayText, colWidth } = props;
  const hoverStyle = { width : colWidth };

  return (
    <div
      className={styles.headerCell}
      style={{ ...hoverStyle, ...headerStyle }}
    >
      <div className={styles.headerCellTitle} title={displayText}>{displayText}</div>
    </div>
  );
};

PGHeaderCell.propTypes = {
  headerStyle : React.PropTypes.object,
  displayText : React.PropTypes.string.isRequired,
  colWidth    : React.PropTypes.number,
};
export { PGHeaderCell };
