import React from "react";
import _ from "underscore";
import { EGBodyCell } from "./EGBodyCell";
import styles from "./EGBodyRow.less";
import cx from "classnames";

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
    const { row, cols, colWidths, isSelected } = this.props;
    let bodyCells = [];

    _.forEach(cols, (col, colKey) => {
      bodyCells.push(
        <EGBodyCell
          key={colKey}
          colKey={colKey}
          col={col}
          colWidth={colWidths[colKey]}
          row={row}
        />
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

EGBodyRow.propTypes = {
  isSelected : React.PropTypes.bool,
  cols       : React.PropTypes.object.isRequired,
  colWidths  : React.PropTypes.object.isRequired,
  row        : React.PropTypes.object.isRequired,
};

export { EGBodyRow };
