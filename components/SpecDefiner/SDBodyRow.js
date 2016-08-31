import React from "react";
import _ from "underscore";
import { renderEGCell } from "../DisplayElems";
import styles from "./SDBodyRow.less";
import cx from "classnames";

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
    const { row, cols, colWidths, isSelected } = this.props;
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
        className={cx(styles.row, { [styles.rowIsSelected] : isSelected })}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >
        {bodyCells}
      </div>
    );
  }
}

SDBodyRow.propTypes = {
  row        : React.PropTypes.object,
  cols       : React.PropTypes.object,
  colWidths  : React.PropTypes.object,
  isSelected : React.PropTypes.bool,
};

export { SDBodyRow };
