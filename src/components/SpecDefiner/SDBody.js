import React from "react";
import { SDBodyRow } from "./SDBodyRow";
import { imap } from "utils";

const SDBody = ({ rows, cols, colWidths }) => {
  const getBodyRows = (row, rowKey) =>
    <SDBodyRow key={rowKey}
               row={row}
               id={rowKey}
               cols={cols}
               colWidths={colWidths}
    />;
  return <div>{imap(getBodyRows, rows)}</div>;
};

SDBody.propTypes = {
  rows      : React.PropTypes.arrayOf(React.PropTypes.object),
  cols      : React.PropTypes.object,
  colWidths : React.PropTypes.object,
};
export { SDBody };
