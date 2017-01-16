import React, { PropTypes } from "react";
import { DGHeaderCell } from "./DGHeaderCell";
import styles from "./common.less";
import { imap } from "utils";
import { Sticky } from "react-sticky";

const DGHeaderRow = ({ cols, colWidths, onDrag, scrollLeft }) => {
  const getDGHeaderCols = (headerColumn, index) => {
    const colName = headerColumn.name;
    return (
      <DGHeaderCell key={index}
                    col={headerColumn}
                    colWidth={colWidths[colName]}
                    onDrag={onDrag}
      />
    );
  };

  return (
    <Sticky stickyStyle={{ overflowX : "hidden", zIndex : 100 }}>
      <div className={styles.row} style={{ marginLeft : -scrollLeft }}>
        {imap(getDGHeaderCols, cols)}
      </div>
    </Sticky>
  );
};

DGHeaderRow.propTypes = {
  cols       : PropTypes.arrayOf(PropTypes.object),
  colWidths  : PropTypes.object.isRequired,
  onDrag     : PropTypes.func,
  scrollLeft : PropTypes.number,
};

export { DGHeaderRow };
