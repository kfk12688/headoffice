/**
 * Created by sharavan on 01/06/16.
 */
import * as React from "react";
import { EGBodyCell } from "./EGBodyCell";
import { IEGRow, IEGCols, IEGCell } from "./EGTypes";
import { blueGrey50, grey50, transparent } from "../../client/styles/colors";

// <editor-fold desc="IEntryGridBodyRow Interface">
// Props
interface IEGBodyRowProps {
  cols: IEGCols;
  colWidths: any;
  row: IEGRow;                               // the object from IEntryGridBody rows
}
// State
interface IEGBodyRowState {
  hovered?: boolean;
  // isSelected?: boolean;
}
// </editor-fold>

class EGBodyRow extends React.Component <IEGBodyRowProps, IEGBodyRowState> {
  state: IEGBodyRowState = {
    hovered   : false,
    // isSelected: false,
  };

  render(): JSX.Element {
    const { row, cols, colWidths } = this.props;
    let bodyCells: React.ReactElement<IEGCell>[] = [];

    for (let colKey in cols) {
      if (cols.hasOwnProperty(colKey)) {
        let col = cols[colKey];
        bodyCells.push(
          <EGBodyCell
            key={colKey}
            colKey={colKey}
            col={col}
            colWidth={colWidths[colKey]}
            row={row}
          />
        );
      }
    }

    // let rowStyle = {
    //   backgroundColor: this.state.isSelected ?
    //                    blueGrey50 :
    //                    this.state.hovered ?
    //                    grey50 :
    //                    transparent,
    // };

    return (
      <div
        className="ho-entrygrid-body-row"
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >
        {bodyCells}
      </div>
    );
  }

  private handleMouseEnter: React.MouseEventHandler = () => {
    this.setState({ hovered: true });
  };
  private handleMouseLeave: React.MouseEventHandler = () => {
    this.setState({ hovered: false });
  };
}

export { EGBodyRow }
