import React from "react";
import { renderEGCell } from "../DisplayElems";
import styles from "./EGBodyCell.less";

export const EGBodyCell = (props) => {
  const { row, col, colKey, colWidth } = props;

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
      {renderEGCell(col.renderType, row, col, colKey)}
    </div>
  );
};
