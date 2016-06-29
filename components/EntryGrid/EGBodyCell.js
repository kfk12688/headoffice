import React from "react";
import cellFactory from "../Utils/CellElementFactory";
import styles from "./EGBodyCell.less";

// interface IEGBodyCellProps {
//   col: IEGCol;
//   colKey: string;
//   colWidth: number;             // the object value from colWidths
//   row: IEGRow;
// }

function formatCell(row, col, colKey) {
  if (row[colKey]) {
    let value = undefined;
    if (col.formatter !== undefined) {
      value = col.formatter(row[colKey].val);
    } else {
      value = row[colKey].val;
    }
    return value;
  }
}

class EGBodyCell extends React.Component {
  constructor(props) {
    super(props);
    const factory = new cellFactory();
    this.node = factory.getElement(props.col.renderType);
  }

  render() {
    const hoverStyle = {
      boxSizing : "border-box",
      display   : "inline-block",
      width     : this.props.colWidth,
    };

    return (
      <div
        className={styles.cell}
        style={{ ...hoverStyle, ...this.props.col.colStyle }}
      >
        {
          React.createElement(
            this.node,
            {
              actions        : this.props.col.actions,
              refFieldSource : this.props.col.refFieldSource,
              refTableSource : this.props.col.refTableSource,
              source         : this.props.col.source,
              value          : formatCell(this.props.row, this.props.col, this.props.colKey),
            }
          )
        }
      </div>
    );
  }
}

export { EGBodyCell };
