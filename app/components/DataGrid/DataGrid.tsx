/**
 * Created by sharavan on 18/05/16.
 */
import * as React from "react";
import "./DataGrid.less";
import { DataGridHeaderRow } from "./DataGridHeaderRow";
import { DataGridBody } from "./DataGridBody";
import { IDataGridProps, IDataGridState } from "./DataGridInterfaces";

class DataGrid extends React.Component <IDataGridProps, IDataGridState> {
  state: IDataGridState = {
    colWidths: this.props.colWidths,
  };

  render(): JSX.Element {
    return (
      <div className="ho-datagrid">
        <DataGridHeaderRow
          cols={this.props.cols}
          colWidths={this.props.colWidths}
          onColumnResize={this.colResizeFunction}
          onClick={this.props.colSortFunction}
          sortKey={this.props.sortKey}
          sortAscending={this.props.sortAscending}
        />
        <DataGridBody
          cols={this.props.cols}
          colWidths={this.state.colWidths}
          rows={this.props.rows}
          selectedKeys={{}}
        />
      </div>
    );
  }

  private colResizeFunction: Function = (colName: string, event: React.MouseEvent) => {
    // fixme: immutability??? how --> refer to redux egghead videos
    let newColWidths = Object.assign({}, this.state.colWidths, {}[colName] = event.clientX);

    this.setState({
      colWidths: newColWidths,
    });
  };
}

export { DataGrid }
