import React from "react";
import _ from "underscore";
import { renderEGCell } from "../DisplayElems";
import styles from "./common.less";

const SDBodyRow = ({ row, cols, colWidths }) => {
  let bodyCells = [];

  _.forEach(cols, (col, colKey) => {
    const hoverStyle = {
      boxSizing : "border-box",
      display   : "inline-block",
      width     : colWidths[colKey],
    };

    bodyCells.push(
      <div
        key={colKey}
        className={styles.cell}
        style={{ ...hoverStyle, ...col.colStyle }}
      >
        {renderEGCell(col.renderType, row, col, colKey)}
      </div>
    );
  });

  return (<div className={styles.row}>{bodyCells}</div>);
};

SDBodyRow.propTypes = {
  row       : React.PropTypes.object,
  cols      : React.PropTypes.object,
  colWidths : React.PropTypes.object,
};

export { SDBodyRow };
