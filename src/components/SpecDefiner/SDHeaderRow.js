import _ from "underscore";
import React from "react";
import { SDHeaderCol } from "./SDHeaderCol";
import styles from "./common.less";

const SDHeaderRow = ({ cols, colWidths }) => {
  let headerRowCols = [];

  _.forEach(cols, (col, colKey) => {
    headerRowCols.push(
      <SDHeaderCol
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
