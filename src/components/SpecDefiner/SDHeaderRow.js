import _ from "underscore";
import React from "react";
import { EGHeaderCol } from "./SDHeaderCol";
import styles from "./SDHeaderRow.less";

const SDHeaderRow = ({ cols, colWidths }) => {
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

SDHeaderRow.propTypes = {
  cols      : React.PropTypes.object.isRequired,
  colWidths : React.PropTypes.object.isRequired,
};

export { SDHeaderRow };
