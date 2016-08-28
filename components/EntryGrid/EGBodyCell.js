import React from "react";
import { renderEGCell } from "../DisplayElems";
import styles from "./EGBodyCell.less";

export const EGBodyCell = (props) => {
  const { row, col, colKey, colWidth } = props;
  const { fieldType : type } = col;

  const hoverStyle = {
    boxSizing : "border-box",
    display   : "inline-block",
    width     : colWidth,
  };

  return (
    <div
      className={styles.cell}
      style={{ ...hoverStyle, ...col.colStyle }}
    >
      {renderEGCell(type, row, col, colKey)}
    </div>
  );
};

EGBodyCell.propTypes = {
  row      : React.PropTypes.object.isRequired,
  col      : React.PropTypes.object.isRequired,
  colKey   : React.PropTypes.string.isRequired,
  colWidth : React.PropTypes.number.isRequired,
};
