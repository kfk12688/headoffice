import React from "react";
import R from "ramda";
import cell from "../getCell";
import styles from "./common.less";

const SDBodyRow = ({ row, cols, colWidths }) => {
  let bodyCells = [];

  R.forEach((col, colKey) => {
    const { name, dataKey, renderType } = col;
    const hoverStyle                    = {
      boxSizing : "border-box",
      display   : "inline-block",
      width     : colWidths[name],
    };
    let value                           = R.path(R.split(".", dataKey), row);
    if (R.isNil(value)) value = false;

    bodyCells.push(
      <div
        key={name}
        className={styles.cell}
        style={{ ...hoverStyle, ...col.colStyle }}
      >
        {cell[renderType](value, col, undefined)}
      </div>
    );
  })(cols);

  return (<div className={styles.row}>{bodyCells}</div>);
};

SDBodyRow.propTypes = {
  row       : React.PropTypes.object,
  cols      : React.PropTypes.object,
  colWidths : React.PropTypes.object,
};

export { SDBodyRow };
