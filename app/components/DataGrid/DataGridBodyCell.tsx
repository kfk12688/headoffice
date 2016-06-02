/**
 * Created by sharavan on 18/05/16.
 */
import "font-awesome-webpack";
import * as React from "react";
import cellFactory from "../Utils/CellElementFactory";
import { IDataGridBodyCellProps, IRowProps, IColProps } from "./DataGridInterfaces";

function formatCell(row: IRowProps, col: IColProps): string | number {
  let value: string | number = undefined;
  if (col.cellFormatter !== undefined) {
    value = col.cellFormatter(row[col.dataKey]);
  } else {
    value = row[col.dataKey];
  }

  return value;
}

class DataGridBodyCell extends React.Component <IDataGridBodyCellProps, {}> {
  node: React.StatelessComponent<any>;

  componentWillMount(): void {
    let factory = new cellFactory();
    this.node   = factory.getElement(this.props.col.renderType);
  }

  render(): JSX.Element {
    const styles = {
      boxSizing: "border-box",
      display  : "inline-block",
      width    : this.props.colWidth,
    };

    return (
      <div
        className="ho-datagrid-body-cell"
        style={styles}
        onClick={this.props.handleClick}
      >
        {
          React.createElement(
            this.node,
            {
              handleClick: this.props.handleClick,
              isSelected : this.props.isSelected,
              linkRef    : this.props.col.linkRef,
              row        : this.props.row,
              value      : formatCell(this.props.row, this.props.col),
            }
          )
        }
      </div>
    );
  }
}

export { DataGridBodyCell }
