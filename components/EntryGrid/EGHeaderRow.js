/**
 * Created by sharavan on 01/06/16.
 */
import React from "react";
import { EGHeaderCol } from "./EGHeaderCol";
import styles from "./EGHeaderRow.less";

/**
 * EntryGridHeaderRow Interface
 * Is the parent for the array of EntryGridHeaderColumn Elements
 */
// Props
// interface IEGHeaderRowProps {
//   cols: IEGCols;
//   colWidths: any;
// }

const EGHeaderRow = ({ cols, colWidths }) => {
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

export { EGHeaderRow };
