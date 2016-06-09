/**
 * Created by sharavan on 18/05/16.
 */
import * as React from "react";
import { DGHeaderColumn } from "./DGHeaderColumn";
import { IColProps } from "./DGTypes";

interface IDGHeaderRowProps {
  cols: Array<IColProps>;
  colWidths: any;
  onClick: Function;
  sortKey: string;
  sortAscending?: boolean;
}

class DGHeaderRow extends React.Component <IDGHeaderRowProps, {}> {
  render(): JSX.Element {
    const cols           = this.props.cols;
    const colWidths      = this.props.colWidths;
    const onClick        = this.props.onClick;
    const sortKey        = this.props.sortKey;
    const sortAscending  = this.props.sortAscending;

    const dataGridHeaderColumns = cols.map((headerColumn: IColProps, index: number) => {
      let colName = headerColumn.name;
      return (
        <DGHeaderColumn
          key={index}
          col={headerColumn}
          colWidth={colWidths[colName]}
          onClick={onClick}
          sortAscending={sortAscending}
          sorted={(sortKey === headerColumn.dataKey) ? true : false}
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

export { DGHeaderRow };
