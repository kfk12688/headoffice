import React from "react";
import { EGBodyCell } from "./EGBodyCell";
import styles from "./EGBodyRow.less";

class EGBodyRow extends React.Component {
  constructor() {
    super();
    this.state = { hovered : false };
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
  }

  handleMouseEnter() {
    this.setState({ hovered : true });
  }

  handleMouseLeave() {
    this.setState({ hovered : false });
  }

  render() {
    const { row, cols, colWidths } = this.props;
    let bodyCells = [];

    for (const colKey in cols) {
      if (cols.hasOwnProperty(colKey)) {
        const col = cols[colKey];
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

    return (
      <div
        className={styles.row}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >
        {bodyCells}
      </div>
    );
  }
}

export { EGBodyRow };
