import React from "react";
import styles from "./config.less";
import {renderDGCell} from "../DisplayElems";

const DGBodyCell = ({col, row, colWidth}) =>
  <div
    className={styles.cell}
    style={{width: colWidth}}
  >
    {renderDGCell(col.renderType, row, col)}
  </div>;

DGBodyCell.propTypes = {
  row: React.PropTypes.object.isRequired,
  col: React.PropTypes.object.isRequired,
  colWidth: React.PropTypes.number.isRequired,
};

export {DGBodyCell};
