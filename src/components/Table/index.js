import React from "react";
import styles from "./Table.less";

const Table = ({ cols, rows, hover, size}) => {
  const getRowValue = (row) =>
    cols.map((col, idx) => {
      let rowVal = row[col.key] || "";
      if (typeof row[col.key] === "object") rowVal = row[col.key][col.key];
      return (<td key={idx}>{rowVal}</td>);
    });

  let className = "table";
  if (hover) className = cx(className, "table-hover");
  if (size === "sm") className = cx(className, "table-sm");

  const colHeaders = <tr>{cols.map((col, idx) => <th key={idx}>{col.displayText}</th>)}</tr>;
  const rowContent = rows.map((row, idx) => <tr key={idx}>{getRowValue(row)}</tr>);

  return (
    <table className={className}>
      <thead>{colHeaders}</thead>
      <tbody>{rowContent}</tbody>
    </table>
  );
};

Table.propTypes = {
  cols      : React.PropTypes.array.isRequired,
  rows      : React.PropTypes.array.isRequired,
  hover     : React.PropTypes.bool,
  size      : React.PropTypes.string,
};

export { Table };
