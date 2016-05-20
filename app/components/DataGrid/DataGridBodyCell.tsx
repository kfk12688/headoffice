/**
 * Created by sharavan on 18/05/16.
 */
import * as React from "react";
import { Checkbox } from "../index";
import { IDataGridBodyCellProps, IRowProps, IColProps } from "./DataGridInterfaces";

class CellElementFactory {
  private props: IDataGridBodyCellProps = undefined;

  constructor(props: IDataGridBodyCellProps) {
    this.props = props;
    let row    = props.row;
    let col    = props.col;

    let { renderType } = col;
    switch (renderType) {
      case "number":
      case "date":
        return this.NumericCell(this.formatCell(row, col));
      case "checkbox":
        return this.CheckboxCell(this.formatCell(row, col));
      default:
      case "text":
        return this.TextCell(this.formatCell(row, col));
    }
  }

  formatCell(row: IRowProps, col: IColProps): any {
    let value: any = undefined;
    if (col.cellFormatter !== undefined) {
      value = col.cellFormatter(row[col.dataKey]);
    } else {
      value = row[col.dataKey];
    }

    return {
      value      : value,
    };
  }

  private TextCell: React.StatelessComponent<any>     = (cell) => {
    const style = {
      textAlign: "left",
    };
    return (
      <div style={style}>
        <span handler={ cell.handleClick }>{cell.value}</span>
      </div>
    );
  };
  private NumericCell: React.StatelessComponent<any>  = (cell) => {
    const style = {
      textAlign: "right",
    };

    return (
      <div style={style}>
        <span handler={ cell.handleClick }>{cell.value}</span>
      </div>
    );
  };
  private CheckboxCell: React.StatelessComponent<any> = (cell) => {
    const style = {
      position: "relative",
      top     : 8,
    };

    // fixme
    return (
      <div style={style}>
        <Checkbox checked={ props.isSelected } handler={ props.handleClick }/>
      </div>
    );
  };
}

const DataGridBodyCell: React.StatelessComponent<IDataGridBodyCellProps> = (props: IDataGridBodyCellProps) => {
  const cellElement = new CellElementFactory(props);
  const styles      = {
    boxSizing: "border-box",
    display  : "inline-block",
    width    : props.colWidth,
  };

  return (
    <div
      className="ho-datagrid-body-cell"
      style={styles}
      onClick={props.handleClick}
    >
      {cellElement}
    </div>
  );
};

DataGridBodyCell.displayName = "DataGridBodyCell";

export { DataGridBodyCell }
