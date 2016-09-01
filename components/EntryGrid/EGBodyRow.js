import React from "react";
import _ from "underscore";
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
        className={styles.row}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >
        {bodyCells}
      </div>
    );
  }
}

EGBodyRow.propTypes = {
  cols      : React.PropTypes.array.isRequired,
  colWidths : React.PropTypes.object.isRequired,
  row       : React.PropTypes.object.isRequired,
};

export { EGBodyRow };
