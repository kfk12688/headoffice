/**
 * Created by sharavan on 18/05/16.
 */
import React from "react";
import cellFactory from "../Utils/CellElementFactory";
import styles from "./DGBodyCell.less";

function formatCell(row, col) {
  let value = undefined;
  if (col.cellFormatter !== undefined) {
    value = col.cellFormatter(row[col.dataKey]);
  } else {
    value = row[col.dataKey];
  }

  return value;
}

class DGBodyCell extends React.Component {
  constructor(props) {
    super(props);
    const factory = new cellFactory();
    this.node = factory.getElement(props.col.renderType);
  }

  render() {
    return (
      <div
        className={styles.cell}
        style={{ width : this.props.colWidth }}
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

export { DGBodyCell };
