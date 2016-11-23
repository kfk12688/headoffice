import React from "react";
import { renderEGCell } from "../DisplayElems";
import styles from "./common.less";

export const PGBodyCell = (props) => {
  const { row, col, colWidth } = props;
  const type = col.fieldType.toLowerCase();
  const colKey = col.fieldName;

  return (
    <span
      className={styles.cell}
      style={{ ...col.colStyle, width : colWidth }}
    >
      {renderEGCell(type, row, col, colKey)}
    </span>
  );
};

PGBodyCell.propTypes = {
  row      : React.PropTypes.object.isRequired,
  col      : React.PropTypes.object.isRequired,
  colWidth : React.PropTypes.number.isRequired,
};
