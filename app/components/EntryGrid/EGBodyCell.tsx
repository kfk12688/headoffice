/**
 * Created by sharavan on 01/06/16.
 */
import * as React from "react";
import cellFactory from "../Utils/CellElementFactory";
import { IEGRow, IEGCol } from "./EGTypes";

// <editor-fold desc="IEntryGridBodyCell Interface">
interface IEGBodyCellProps {
  col: IEGCol;
  colKey: string;
  colWidth: number;             // the object value from colWidths
  row: IEGRow;
}
// </editor-fold>

function formatCell(row: IEGRow, col: IEGCol, colKey: string): string | number {
  if (row[colKey]) {
    let value: any = undefined;
    if (col.formatter !== undefined) {
      value = col.formatter(row[colKey].val);
    } else {
      value = row[colKey].val;
    }
    return value;
  }
}

class EGBodyCell extends React.Component <IEGBodyCellProps, {}> {
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
        className="ho-entrygrid-body-cell"
        style={Object.assign({}, styles, this.props.col.colStyle)}
      >
        {
          React.createElement(
            this.node,
            {
              actions       : this.props.col.actions,
              refFieldSource: this.props.col.refFieldSource,
              refTableSource: this.props.col.refTableSource,
              source        : this.props.col.source,
              value         : formatCell(this.props.row, this.props.col, this.props.colKey),
            }
          )
        }
      </div>
    );
  }
}

export { EGBodyCell }
