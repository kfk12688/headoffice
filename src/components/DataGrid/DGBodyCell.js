import React from "react";
import styles from "./common.less";
import componentsHash from "../componentsHash";

const DGBodyCell = ({ col, colWidth, value, id }) => {
  const renderFn = componentsHash[col.renderType].render;
  return (
    <span style={{ width : colWidth }}
          className={styles.cell}
    >
      {renderFn(value, col, id)}
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
