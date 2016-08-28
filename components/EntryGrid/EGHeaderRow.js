/**
 * Created by sharavan on 01/06/16.
 */
import React from "react";
import _ from "underscore";
import { EGHeaderCol } from "./EGHeaderCol";
import styles from "./EGHeaderRow.less";

const EGHeaderRow = ({ cols, colWidths }) => {
  let headerRowCols = [];

  _.forEach(cols, (col, colKey) => {
    headerRowCols.push(
      <EGHeaderCol
        key={colKey}
        colWidth={colWidths[colKey]}
        headerStyle={col.headerStyle}
        displayText={col.displayText}
      />
    );
  });

  return <div className={styles.row}>{headerRowCols}</div>;
};

EGHeaderRow.propTypes = {
  cols      : React.PropTypes.object.isRequired,
  colWidths : React.PropTypes.object.isRequired,
};

export { EGHeaderRow };
