/**
 * Created by sharavan on 18/05/16.
 */

import * as React from "react";
import { DataGridHeaderColumn } from "./DataGridHeaderColumn";
import { IDataGridHeaderRowProps, IColProps } from "./DataGridInterfaces";

class DataGridHeaderRow extends React.Component <IDataGridHeaderRowProps, {}> {
  render(): JSX.Element {
    const cols           = this.props.cols;
    const colWidths      = this.props.colWidths;
    const onColumnResize = this.props.onColumnResize;
    const onClick        = this.props.onClick;
    const sortKey        = this.props.sortKey;

    const dataGridHeaderColumns = cols.map((headerColumn: IColProps, index: number) => {
      let colName = headerColumn.name;
      return (
        <DataGridHeaderColumn
          key={index}
          col={headerColumn}
          colWidth={colWidths[colName]}
          onColumnResize={onColumnResize}
          onClick={onClick}
          sorted={ (sortKey === headerColumn.dataKey) ? true : false }
        />
      );
    });

    return (
      <div className="ho-datagrid-header-row">
        {dataGridHeaderColumns}
      </div>
    );
  };
}

export { DataGridHeaderRow };
