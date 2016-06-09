/**
 * Created by sharavan on 18/05/16.
 */
import "font-awesome-webpack";
import * as React from "react";
import cellFactory from "../Utils/CellElementFactory";
import { IRowProps, IColProps } from "./DGTypes";

interface IDGBodyCellProps {
  col: IColProps;
  colWidth: number;                                // the object value from colWidths
  row: IRowProps;
  isSelected: boolean;
}

function formatCell(row: IRowProps, col: IColProps): string | number {
  let value: string | number = undefined;
  if (col.cellFormatter !== undefined) {
    value = col.cellFormatter(row[col.dataKey]);
  } else {
    value = row[col.dataKey];
  }

  return value;
}

class DGBodyCell extends React.Component <IDGBodyCellProps, {}> {
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
      >
        {
          React.createElement(
            this.node,
            {
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

export { DGBodyCell }
