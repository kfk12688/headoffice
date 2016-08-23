import React from "react";
import _ from "underscore";
import styles from "./DGBody.less";
import { DGBodyRow } from "./DGBodyRow";

const DGBody = ({ rows, cols, colWidths, selectedKeys, onRowClick }) => {
  const datagridBodyRows = [];

  _.forEach(rows, row => {
    const selectedKeyIdx = selectedKeys.findIndex((key) => key === row.id);

    datagridBodyRows.push(
      <DGBodyRow
        key={row.id}
        cols={cols}
        row={row}
        colWidths={colWidths}
        onRowClick={onRowClick}
        isRowSelected={selectedKeyIdx !== -1}
      />
    );
  });

  return (
    <div
      className={styles.body}
    >
      {datagridBodyRows}
    </div>
  );
};

DGBody.displayName = "DGBody";

DGBody.propTypes = {
  rows         : React.PropTypes.object.isRequired,
  cols         : React.PropTypes.object.isRequired,
  colWidths    : React.PropTypes.object.isRequired,
  selectedKeys : React.PropTypes.array.isRequired,
  onRowClick   : React.PropTypes.func.isRequired,
};

export { DGBody };
