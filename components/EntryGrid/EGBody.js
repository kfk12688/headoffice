import React from "react";
import { EGBodyRow } from "./EGBodyRow";
import styles from "./EGBody.less";

const EGBody = ({ rows, cols, colWidths, selectedRow }) => {
  let bodyRows = [];

  for (const rowKey in rows) {
    if (rows.hasOwnProperty(rowKey)) {
      const row = rows[rowKey];

      bodyRows.push(
        <EGBodyRow
          key={rowKey}
          colWidths={colWidths}
          cols={cols}
          row={row}
          isSelected={selectedRow === rowKey}
        />
      );
    }
  }

  return <div className={styles.body}>{bodyRows}</div>;
};

EGBody.displayName = "EGBody";

export { EGBody };
