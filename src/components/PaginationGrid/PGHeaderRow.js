import React from "react";
import _ from "underscore";
import { PGHeaderCell } from "./PGHeaderCell";
import styles from "./common.less";

const PGHeaderRow = ({ cols, colWidths, scrollLeft }) => {
  const headerRowCols = [];

  _.forEach(cols, (col, colKey) => {
    headerRowCols.push(
      <PGHeaderCell
        key={colKey}
        colWidth={colWidths[col.fieldName]}
        headerStyle={col.headerStyle}
        displayText={col.displayText}
      />
    );
  });

  return (
    <div className={styles.row} style={{ marginLeft : -scrollLeft }}>
      {headerRowCols}
    </div>
  );
};

PGHeaderRow.propTypes = {
  cols       : React.PropTypes.array.isRequired,
  colWidths  : React.PropTypes.object.isRequired,
  scrollLeft : React.PropTypes.number,
};

export { PGHeaderRow };
