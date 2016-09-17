import React from "react";
import { EGHeaderCol } from "./SDHeaderCol";
import styles from "./SDHeaderRow.less";

const SDHeaderRow = ({ cols, colWidths }) => {
  let headerRowCols = [];

  for (const colKey in cols) {
    if (cols.hasOwnProperty(colKey)) {
      const col = cols[colKey];

      headerRowCols.push(
        <EGHeaderCol
          key={colKey}
          colWidth={colWidths[colKey]}
          headerStyle={col.headerStyle}
          displayText={col.displayText}
        />
      );
    }
  }

  return <div className={styles.row}>{headerRowCols}</div>;
};

export { SDHeaderRow };
