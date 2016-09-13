/**
 * Created by sharavan on 03/09/16.
 */
import React from "react";
import styles from "./Table.less";

const Table = ({ cols, rows }) => {
  const getRowValue = (row) =>
    cols.map((col, idx) => {
      let rowVal = row[col.key] || "";
      if (typeof row[col.key] === "object") rowVal = row[col.key][col.key];
      return (<td key={idx}>{rowVal}</td>);
    });

  const colHeaders = <tr>{cols.map((col, idx) => <th key={idx}>{col.displayText}</th>)}</tr>;
  const rowContent = rows.map((row, idx) => <tr key={idx}>{getRowValue(row)}</tr>);

  return (
    <table className={styles.tableContainer}>
      <thead>{colHeaders}</thead>
      <tbody>{rowContent}</tbody>
    </table>
  );
};

Table.propTypes = {
  cols : React.PropTypes.array.isRequired,
  rows : React.PropTypes.array.isRequired,
};

export { Table };
