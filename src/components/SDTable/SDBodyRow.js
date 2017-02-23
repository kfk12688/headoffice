import React from "react";
import styles from "./styles.less";
import { propOr, imap } from "utils";
import componentsHash from "../componentsHash";

const SDBodyRow = ({ row, cols, colWidths, id }) => {
  const mapCol = (col, colKey) => {
    const { renderType } = col;
    const style          = {
      boxSizing : "border-box",
      display   : "inline-block",
      width     : colWidths[colKey],
    };
    const renderFn       = componentsHash[renderType].render;

    const value = (colKey === "fieldName") ?
                  propOr("", "displayName", row) :
                  propOr(false, colKey, row);

    return (
      <div key={colKey}
           className={styles.cell}
           style={{ ...style, ...col.colStyle }}
      >
        {renderFn(value, col, id)}
      </div>
    );
  };

  return (<div className={styles.row}>{imap(mapCol, cols)}</div>);
};

SDBodyRow.propTypes = {
  row       : React.PropTypes.object,
  id        : React.PropTypes.string,
  cols      : React.PropTypes.object,
  colWidths : React.PropTypes.object,
};

export { SDBodyRow };
