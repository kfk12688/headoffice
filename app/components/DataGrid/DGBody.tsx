/**
 * Created by sharavan on 18/05/16.
 */
import * as React from "react";
import { DGBodyRow } from "./DGBodyRow";
import { IColProps, IRowProps } from "./DGTypes";

interface IDGBodyProps {
  rows: IRowProps[];
  cols: IColProps[];
  colWidths: any;
  selectedKeys: any;
  onRowClick: Function;
}

const DGBody: React.StatelessComponent<IDGBodyProps> = (props: IDGBodyProps) => {
  const styles           = {};
  const datagridBodyRows = props.rows.map((row: IRowProps, index: number) => {
    return (
      <DGBodyRow
        rowIndex={index}
        key={row.id}
        colWidths={props.colWidths}
        cols={props.cols}
        row={row}
        selectedKeys={props.selectedKeys}
        onRowClick={props.onRowClick}
      />
    );
  });

  return (
    <div
      className="ho-datagrid-body"
      style={styles}
    >
      {datagridBodyRows}
    </div>
  );
};

DGBody.displayName = "DGBody";

export { DGBody }
