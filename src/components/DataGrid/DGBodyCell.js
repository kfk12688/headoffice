import React from "react";
import styles from "./common.less";
import getCell from "../getCell";

const DGBodyCell = ({ col, colWidth, value, id }) => {
  return (
    <span style={{ width : colWidth }}
          className={styles.cell}
    >
    {getCell[col.renderType](value, col, id)}
  </span>
  );
};

DGBodyCell.propTypes = {
  value    : React.PropTypes.any.isRequired,
  id       : React.PropTypes.string.isRequired,
  col      : React.PropTypes.object.isRequired,
  colWidth : React.PropTypes.number.isRequired,
};

export { DGBodyCell };
