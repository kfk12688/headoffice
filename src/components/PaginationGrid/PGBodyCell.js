import React from "react";
import { renderEGCell } from "../DisplayElems";
import styles from "./common.less";

export const PGBodyCell = (props) => {
  const { row, col, colWidth } = props;
  const type = col.fieldType.toLowerCase();
  const colKey = col.fieldName;
  const hoverStyle = {
    boxSizing : "border-box",
    display   : "inline-block",
    width     : colWidth,
  };

  return (
    <div
      className={styles.bodycell}
      style={{ ...hoverStyle, ...col.colStyle }}
    >
      {renderEGCell(type, row, col, colKey)}
    </div>
  );
};

PGBodyCell.propTypes = {
  row      : React.PropTypes.object.isRequired,
  col      : React.PropTypes.object.isRequired,
  colWidth : React.PropTypes.number.isRequired,
};
