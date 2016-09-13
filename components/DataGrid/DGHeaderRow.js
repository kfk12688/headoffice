/**
 * Created by sharavan on 18/05/16.
 */
import React, { PropTypes } from "react";
import { DGHeaderColumn } from "./DGHeaderColumn";
import styles from "./DGHeaderRow.less";

const DGHeaderRow = ({ cols, colWidths, onClick, onDrag, sortKey, sortAscending }) => {
  const dataGridHeaderColumns = cols.map((headerColumn, index) => {
    const colName = headerColumn.name;
    return (
      <DGHeaderColumn
        key={index}
        col={headerColumn}
        colWidth={colWidths[colName]}
        onClick={onClick}
        onDrag={onDrag}
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

DGHeaderRow.propTypes = {
  cols          : PropTypes.arrayOf(PropTypes.object),
  colWidths     : PropTypes.object.isRequired,
  sortKey       : PropTypes.string.isRequired,
  onClick       : PropTypes.func,
  sortAscending : PropTypes.bool,
};

export { DGHeaderRow };
