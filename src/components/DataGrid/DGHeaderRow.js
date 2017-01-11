import React, { PropTypes } from "react";
import { DGHeaderCell } from "./DGHeaderCell";
import styles from "./common.less";
import { Sticky } from "react-sticky";

const DGHeaderRow = ({ cols, colWidths, onClick, onDrag, sortKey, sortAscending, scrollLeft }) => {
  const dataGridHeaderColumns = cols.map((headerColumn, index) => {
    const colName = headerColumn.name;
    return (
      <DGHeaderCell
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
    <Sticky stickyStyle={{ overflowX : "hidden", zIndex : 100 }}>
      <div className={styles.row} style={{ marginLeft : -scrollLeft }}>
        {dataGridHeaderColumns}
      </div>
    </Sticky>
  );
};

DGHeaderRow.propTypes = {
  cols          : PropTypes.arrayOf(PropTypes.object),
  colWidths     : PropTypes.object.isRequired,
  onClick       : PropTypes.func,
  sortKey       : PropTypes.string,
  sortAscending : PropTypes.bool,
  onDrag        : React.PropTypes.func,
  scrollLeft    : React.PropTypes.number,
};

export { DGHeaderRow };
