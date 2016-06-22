/**
 * Created by sharavan on 18/05/16.
 */
import React from "react";
import styles from "./DGBody.less";
import { DGBodyRow } from "./DGBodyRow";

const DGBody = ({ rows, cols, colWidths, selectedKeys, onRowClick }) => {
  const datagridBodyRows = [];

  for (const rowKey in rows) {
    if (rows.hasOwnProperty(rowKey)) {
      const row = rows[rowKey];

      datagridBodyRows.push(
        <DGBodyRow
          rowKey={row.id}
          key={row.id}
          colWidths={colWidths}
          cols={cols}
          row={row}
          isRowSelected={selectedKeys.find((key) => key === row.id)}
          onRowClick={onRowClick}
        />
      );
    }
  }

  return (
    <div
      className={styles.body}
    >
      {datagridBodyRows}
    </div>
  );
};

DGBody.displayName = "DGBody";

export { DGBody };
