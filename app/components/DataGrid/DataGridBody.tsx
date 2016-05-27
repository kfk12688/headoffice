/**
 * Created by sharavan on 18/05/16.
 */

import * as React from "react";
import { DataGridBodyRow } from "./DataGridBodyRow";
import { IDataGridBodyProps, IRowProps } from "./DataGridInterfaces";

const DataGridBody: React.StatelessComponent<IDataGridBodyProps> = (props: IDataGridBodyProps) => {
  const styles = {};
  const datagridBodyRows = props.rows.map((row: IRowProps, index: number) => {
    return (
      <DataGridBodyRow
        key={row.id}
        colWidths={props.colWidths}
        cols={props.cols}
        row={row}
        selectedKeys={props.selectedKeys}
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

DataGridBody.displayName = "DataGridBody";

export { DataGridBody }
