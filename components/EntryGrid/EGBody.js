import React from "react";
import _ from "underscore";
import { EGBodyRow } from "./EGBodyRow";
import styles from "./EGBody.less";

const EGBody = ({ rows, cols, colWidths, selectedRow }) => {
  let bodyRows = [];

  _.forEach(rows, (row, rowKey) => {
    bodyRows.push(
      <EGBodyRow
        key={rowKey}
        colWidths={colWidths}
        cols={cols}
        row={row}
        isSelected={selectedRow === rowKey}
      />
    );
  });

  return <div className={styles.body}>{bodyRows}</div>;
};

EGBody.propTypes = {
  selectedRow : React.PropTypes.string,
  cols        : React.PropTypes.object.isRequired,
  colWidths   : React.PropTypes.object.isRequired,
  rows        : React.PropTypes.object.isRequired,
};

export { EGBody };
