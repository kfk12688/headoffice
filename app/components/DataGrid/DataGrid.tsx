/**
 * Created by sharavan on 18/05/16.
 */

import * as React from "react";
import "./DataGrid.less";
import { DataGridHeaderRow } from "./DataGridHeaderRow";
import { DataGridBody } from "./DataGridBody";
import { IDataGridProps, IDataGridState, IRowProps } from "./DataGridInterfaces";

class DataGrid extends React.Component <IDataGridProps, IDataGridState> {
  state: IDataGridState = {
    colWidths: {
      "has-alert-col"  : 38,
      "favorite-col"  : 38,
      "sheet-count-col": 80,
      "name-col"       : 150,
      "owner-id-col"   : 100,
      "size-col"       : 100,
      "updated-at-col" : 150,
    },
    rows     : this.props.rows,
    sortKey  : "name",
  };

  render(): JSX.Element {
    return (
      <div className="ho-datagrid">
        <DataGridHeaderRow
          cols={this.props.cols}
          colWidths={this.state.colWidths}
          onColumnResize={this.onColumnResize}
          onClick={this.onClickSortColumn}
          sortKey={this.state.sortKey}
        />
        <DataGridBody
          cols={this.props.cols}
          colWidths={this.state.colWidths}
          rows={this.state.rows}
          selectedKeys={this.props.selectedKeys}
        />
      </div>
    );
  }

  private onColumnResize = (colName: string, event: React.MouseEvent) => {
    let newColWidths = Object.assign({}, this.state.colWidths, {}[colName] = event.clientX);

    this.setState({
      colWidths: newColWidths,
    });
  };

  private onClickSortColumn = (dataKey: string, event: React.MouseEvent, sortOrder: string) => {
    let sortedRows: IRowProps = undefined;
    this.setState({ sortKey: dataKey });

    if (sortOrder === "asc") {
      sortedRows = this.state.rows.sort((a: IRowProps, b: IRowProps) => {
        return +(a[dataKey] > b[dataKey]) || +(a[dataKey] === b[dataKey]) - 1;
      });
    } else if (sortOrder === "desc") {
      sortedRows = this.state.rows.sort((a: IRowProps, b: IRowProps) => {
        return +(a[dataKey] < b[dataKey]);
      });
    }

    this.setState({ rows: sortedRows });
  };
}

export { DataGrid }
