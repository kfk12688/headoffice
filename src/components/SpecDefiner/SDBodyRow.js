import React from "react";
import _ from "underscore";
import { renderEGCell } from "../DisplayElems";
import styles from "./SDBodyRow.less";

class SDBodyRow extends React.Component {
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

    _.forEach(cols, (col, colKey) => {
      const hoverStyle = {
        boxSizing : "border-box",
        display   : "inline-block",
        width     : colWidths[colKey],
      };

      bodyCells.push(
        <div
          key={colKey}
          className={styles.cell}
          style={{ ...hoverStyle, ...col.colStyle }}
        >
          {renderEGCell(col.renderType, row, col, colKey)}
        </div>
      );
    });

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

SDBodyRow.propTypes = {
  row       : React.PropTypes.object,
  cols      : React.PropTypes.object,
  colWidths : React.PropTypes.object,
};

export { SDBodyRow };
