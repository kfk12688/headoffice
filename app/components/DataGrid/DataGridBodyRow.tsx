/**
 * Created by sharavan on 18/05/16.
 */

import * as React from "react";
import { DataGridBodyCell } from "./DataGridBodyCell";
import { IDataGridBodyRowProps, IColProps } from "./DataGridInterfaces";
import { grey50, transparent, blueGrey50 } from "../../client/styles/colors";

class DataGridBodyRow extends React.Component<IDataGridBodyRowProps, IDataGridBodyRowState> {
  state: IDataGridBodyRowState = {
    hovered   : false,
    isSelected: false,
  };

  render(): JSX.Element {
    const dataGridBodyCells = this.props.cols.map((col: IColProps, index: number) => {
      let colName = col.name;
      return (
        <DataGridBodyCell
          key={+(this.props.row.id + "" + index)}
          col={col}
          colWidth={this.props.colWidths[colName]}
          row={this.props.row}
          isSelected={this.state.isSelected}
          handleClick={this.handleClick}
        />
      );
    });

    let rowStyle = {
      backgroundColor: this.state.isSelected ?
                       blueGrey50 :
                       this.state.hovered ?
                       grey50 :
                       transparent,
    };

    return (
      <div
        style={rowStyle}
        className="ho-datagrid-body-row"
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        onClick={this.handleClick}
      >
        {dataGridBodyCells}
      </div>
    );
  }

  private handleClick: React.MouseEventHandler      = () => {
    if (this.state.isSelected) {
      this.setState({ isSelected: false });
    } else {
      this.setState({ isSelected: true });
    }
  };
  private handleMouseEnter: React.MouseEventHandler = () => {
    this.setState({ hovered: true });
  };
  private handleMouseLeave: React.MouseEventHandler = () => {
    this.setState({ hovered: false });
  };
}

export { DataGridBodyRow }
