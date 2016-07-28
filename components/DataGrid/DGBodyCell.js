import React from "react";
import styles from "./DGBodyCell.less";
import { renderDGCell } from "../DisplayElems";

export const DGBodyCell = ({ row, col, isSelected, colWidth }) =>
  <div
    className={styles.cell}
    style={{ width : colWidth }}
  >
    {renderDGCell(col.renderType, row, col, isSelected)}
  </div>;

DGBodyCell.propTypes = {
  row        : React.PropTypes.any.isRequired,
  col        : React.PropTypes.any.isRequired,
  colWidth   : React.PropTypes.number.isRequired,
  isSelected : React.PropTypes.bool,
};
