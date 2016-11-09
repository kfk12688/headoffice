import React, { PropTypes } from "react";
import { DGHeaderColumn } from "./DGHeaderColumn";
import styles from "./config.less";

const DGHeaderRow = ({ cols, colWidths, onClick, onDrag, sortKey, sortAscending, scrollLeft }) => {
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
      <span className={styles.cols} style={{ marginLeft : -scrollLeft }}>
        {dataGridHeaderColumns}
      </span>
    </div>
  );
};

DGHeaderRow.propTypes = {
  cols          : PropTypes.arrayOf(PropTypes.object),
  colWidths     : PropTypes.object.isRequired,
  sortKey       : PropTypes.string.isRequired,
  onClick       : PropTypes.func,
  sortAscending : PropTypes.bool,
  onDrag        : React.PropTypes.func,
  scrollLeft    : React.PropTypes.number,
};

export { DGHeaderRow };
