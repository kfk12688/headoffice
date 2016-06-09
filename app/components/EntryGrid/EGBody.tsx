/**
 * Created by sharavan on 01/06/16.
 */
import * as React from "react";
import { EGBodyRow } from "./EGBodyRow";
import { IEGCols, IEGRows } from "./EGTypes";

// <editor-fold desc="IEGBodyProps">
interface IEGBodyProps {
  cols: IEGCols;
  colWidths?: {
    [colKey: string]: number;
  };
  rows: IEGRows;
}
// </editor-fold>

const EGBody: React.StatelessComponent<IEGBodyProps> = (props: IEGBodyProps) => {
  const { rows, cols, colWidths } = props;
  let bodyRows: React.ReactElement<IEGRows>[] = [];

  for (let rowKey in rows) {
    if (rows.hasOwnProperty(rowKey)) {
      let row = rows[rowKey];

      bodyRows.push(
        <EGBodyRow
          key={rowKey}
          colWidths={colWidths}
          cols={cols}
          row={row}
        />
      );
    }
  }

  return <div className="ho-entrygrid-body">{bodyRows}</div>;
};

EGBody.displayName = "EGBody";

export { EGBody }
