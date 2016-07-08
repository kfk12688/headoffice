/**
 * Created by sharavan on 18/05/16.
 */
import React, { PropTypes } from "react";
import { DGHeaderColumn } from "./DGHeaderColumn";
import styles from "./DGHeaderRow.less";

const DGHeaderRow = ({ cols, colWidths, onClick, sortKey, sortAscending }) => {
  const dataGridHeaderColumns = cols.map((headerColumn, index) => {
    const colName = headerColumn.name;
    return (
      <DGHeaderColumn
        key={index}
        col={headerColumn}
        colWidth={colWidths[colName]}
        onClick={onClick}
        sortAscending={sortAscending}
        sorted={sortKey === headerColumn.dataKey}
      />
    );
  });

  return (
    <div className={styles.row}>
      {dataGridHeaderColumns}
    </div>
  );
};

DGHeaderRow.PropTypes = {
  cols          : PropTypes.array.isRequired,
  colWidths     : PropTypes.object.isRequired,
  onClick       : PropTypes.func.isRequired,
  sortKey       : PropTypes.string.isRequired,
  sortAscending : PropTypes.boolean,
};

export { DGHeaderRow };
