import React from "react";
import styles from "./styles.less";
import componentsHash from "../componentsHash";
import { isNil } from "utils";

export const PGBodyCell = (props) => {
  const { row, col, colWidth }           = props;
  const { fieldType, fieldName }         = col;
  const { id }                           = row;
  const value                            = row[fieldName];
  const renderFn                         = componentsHash[fieldType].render;
  return (
    <span
      className={styles.cell}
      style={{ ...col.colStyle, width : colWidth }}
    >
      {renderFn(value, col, id)}
    </span>
  );
};

PGBodyCell.propTypes = {
  row      : React.PropTypes.object.isRequired,
  col      : React.PropTypes.object.isRequired,
  colWidth : React.PropTypes.number.isRequired,
};
