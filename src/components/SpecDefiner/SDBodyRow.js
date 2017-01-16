import React from "react";
import R from "ramda";
import cell from "../getCell";
import styles from "./common.less";
import { imap } from "utils";

const SDBodyRow = ({ row, cols, colWidths }) => {
  const mapCol = (col, colKey) => {
    const { renderType } = col;
    const style          = {
      boxSizing : "border-box",
      display   : "inline-block",
      width     : colWidths[colKey],
    };
    let value            = R.path([colKey], row);
    if (R.isNil(value)) value = false;

    return (
      <div key={colKey}
           className={styles.cell}
           style={{ ...style, ...col.colStyle }}
      >
        {cell[renderType](value, col, colKey)}
      </div>
    );
  };

  return (<div className={styles.row}>{imap(mapCol, cols)}</div>);
};

SDBodyRow.propTypes = {
  row       : React.PropTypes.object,
  cols      : React.PropTypes.object,
  colWidths : React.PropTypes.object,
};

export { SDBodyRow };
