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
      const selectedKeyIdx = selectedKeys.findIndex((key) => key === row._id);

      datagridBodyRows.push(
        <DGBodyRow
          rowKey={row._id}
          key={row._id}
          colWidths={colWidths}
          cols={cols}
          row={row}
          isRowSelected={selectedKeyIdx !== -1}
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
