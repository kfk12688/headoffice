/**
 * Created by sharavan on 18/05/16.
 */
import * as React from "react";
import "./DG.less";
import { DGHeaderRow } from "./DGHeaderRow";
import { DGBody } from "./DGBody";
import { IRowProps, IColProps } from "./DGTypes";

interface IDGProps {
  rows: IRowProps[];
  cols: IColProps[];
  colWidths?: any;
  colResizeFunction?: Function;
  colSortFunction?: Function;
  selectedKeys?: any;
  sortKey?: string;
  sortAscending?: boolean;
  onRowClick: Function;
}

interface IDGState {
  colWidths?: any;
}

class DG extends React.Component <IDGProps, IDGState> {
  state: IDGState = {
    colWidths: this.props.colWidths,
  };

  render(): JSX.Element {
    return (
      <div className="ho-datagrid">
        <DGHeaderRow
          cols={this.props.cols}
          colWidths={this.props.colWidths}
          onClick={this.props.colSortFunction}
          sortKey={this.props.sortKey}
          sortAscending={this.props.sortAscending}
        />
        <DGBody
          cols={this.props.cols}
          colWidths={this.state.colWidths}
          rows={this.props.rows}
          selectedKeys={{}}
          onRowClick={this.props.onRowClick}
        />
      </div>
    );
  }
}

export { DG }
