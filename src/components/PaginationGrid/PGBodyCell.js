import React from "react";
import getCell from "../getCell";
import styles from "./common.less";

export const PGBodyCell = (props) => {
  const { row, col, colWidth }           = props;
  const { fieldType, fieldName }         = col;

  return (
    <span
      className={styles.cell}
      style={{ ...col.colStyle, width : colWidth }}
    >
      {getCell[fieldType](row[fieldName], col, fieldName)}
    </span>
  );
};

PGBodyCell.propTypes = {
  row      : React.PropTypes.object.isRequired,
  col      : React.PropTypes.object.isRequired,
  colWidth : React.PropTypes.number.isRequired,
};
