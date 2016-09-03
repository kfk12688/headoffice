import React from "react";
import _ from "underscore";
import { EGBodyRow } from "./EGBodyRow";
import styles from "./EGBody.less";

const EGBody = ({ rows, cols, colWidths }) => {
  let bodyRows = [];

  _.forEach(rows, (row, rowKey) => {
    bodyRows.push(
      <EGBodyRow
        key={rowKey}
        rowKey={rowKey}
        colWidths={colWidths}
        cols={cols}
        row={row}
      />
    );
  });

  return <div className={styles.body}>{bodyRows}</div>;
};

EGBody.propTypes = {
  cols        : React.PropTypes.array.isRequired,
  colWidths   : React.PropTypes.object.isRequired,
  rows        : React.PropTypes.object.isRequired,
};

export { EGBody };
