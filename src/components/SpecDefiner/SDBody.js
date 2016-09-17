import React from "react";
import _ from "underscore";
import { SDBodyRow } from "./SDBodyRow";
import styles from "./SDBody.less";

const SDBody = ({ rows, cols, colWidths }) => {
  let bodyRows = [];

  _.forEach(rows, (row, rowKey) => {
    bodyRows.push(
      <SDBodyRow
        key={rowKey}
        colWidths={colWidths}
        cols={cols}
        row={row}
      />
    );
  });

  return <div className={styles.body}>{bodyRows}</div>;
};

SDBody.propTypes = {
  rows      : React.PropTypes.arrayOf(React.PropTypes.object),
  cols      : React.PropTypes.object,
  colWidths : React.PropTypes.object,
};

export { SDBody };
