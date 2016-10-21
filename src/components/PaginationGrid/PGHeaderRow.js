/**
 * Created by sharavan on 01/06/16.
 */
import React from "react";
import _ from "underscore";
import { EGHeaderCol } from "./PGHeaderCol";
import styles from "./PGHeaderRow.less";

const PGHeaderRow = ({ cols, colWidths, scrollLeft }) => {
  const headerRowCols = [];

  _.forEach(cols, (col, colKey) => {
    headerRowCols.push(
      <EGHeaderCol
        key={colKey}
        colWidth={colWidths[col.fieldName]}
        headerStyle={col.headerStyle}
        displayText={col.displayText}
      />
    );
  });

  return (
    <div className={styles.row}>
      <span className={styles.cols} style={{ marginLeft : -scrollLeft }}>
        {headerRowCols}
      </span>
    </div>
  );
};

PGHeaderRow.propTypes = {
  cols       : React.PropTypes.array.isRequired,
  colWidths  : React.PropTypes.object.isRequired,
  scrollLeft : React.PropTypes.number,
};

export { PGHeaderRow };
