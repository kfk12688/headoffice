/**
 * Created by sharavan on 03/09/16.
 */
import React from "react";
import styles from "./Table.less";

const Table = ({ cols, rows, caption }) => {
  const thead = (
    <thead>
      <tr>{cols.map(col => <th>{col.displayText}</th>)}</tr>
    </thead>
  );

  const tbody = rows.map(row =>
    <tr>
      {cols.map(col => <td>{row[col.key] || ""}</td>)}
    </tr>
  );

  return (
    <table className={styles.tableContainer}>
      {thead}
      {tbody}
    </table>
  );

};

export { Table };
