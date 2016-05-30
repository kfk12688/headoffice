/**
 * Created by sharavan on 18/05/16.
 */
import "font-awesome-webpack";
import * as React from "react";
import { IDataGridHeaderColumnProps, IDataGridHeaderColumnState } from "./DataGridInterfaces";
import { grey50 } from "../../client/styles/colors";
let FontAwesome: any = require("react-fontawesome");

class DataGridHeaderColumn extends React.Component <IDataGridHeaderColumnProps, IDataGridHeaderColumnState> {
  state: IDataGridHeaderColumnState = {
    hovered      : false,
  };

  render(): JSX.Element {
    // Props
    const col            = this.props.col;
    const colWidth       = this.props.colWidth;
    const onColumnResize = this.props.onColumnResize;
    const sorted         = this.props.sorted;

    // Inline styles
    const styles  = {
      backgroundColor: this.state.hovered && grey50,
      cursor: this.state.hovered && "pointer",
      textDecoration : this.state.hovered && "underline",
      width          : colWidth,
    };
    const faStyle = {
      fontSize: 10,
      position: "absolute",
      right   : 10,
      top     : 13,
    };

    // Local vars
    let arrow: React.ReactNode = undefined;
    let isColSortable = (col.sortable === undefined) || col.sortable;

    if (isColSortable && sorted) {
      if (this.props.sortAscending) {
        arrow = <FontAwesome style={faStyle} name="long-arrow-up"/>;
      } else {
        arrow = <FontAwesome style={faStyle} name="long-arrow-down"/>;
      }
    }

    return (
      <span
        className="ho-datagrid-header-col"
        style={ Object.assign({}, styles, this.props.col.headerStyle)}
        onMouseOver={isColSortable && this.handleMouseOver}
        onMouseOut={isColSortable && this.handleMouseOut}
        onClick={isColSortable && this.onClick.bind(this, col.dataKey)}
      >
        <div className="ho-datagrid-header-cell">
          <span>{col.text}</span>
        </div>
        {arrow}
        <div className="ho-datagrid-header-divider" onMouseDown={onColumnResize.bind(this, col.name)}/>
      </span>
    );
  };

  private handleMouseOver: React.MouseEventHandler = (event: React.MouseEvent) => {
    this.setState({ hovered: true });
  }

  private handleMouseOut: React.MouseEventHandler = (event: React.MouseEvent) => {
    this.setState({ hovered: false });
  }

  private onClick: Function = (dataKey: string, event: React.MouseEvent) => {
    if (this.props.sortAscending) {
      this.props.onClick(dataKey, "desc", event);
    } else {
      this.props.onClick(dataKey, "asc", event);
    }
  };
}

export { DataGridHeaderColumn };
