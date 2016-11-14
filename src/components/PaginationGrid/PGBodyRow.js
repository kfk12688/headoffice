import React from "react";
import _ from "underscore";
import { PGBodyCell } from "./PGBodyCell";
import { grey300 } from "../_styles/colors";

class PGBodyRow extends React.Component {
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
    const { row, cols, colWidths, rowKey } = this.props;
    let bodyCells = [];

    _.forEach(cols, (col, colKey) => {
      bodyCells.push(
        <PGBodyCell
          key={colKey}
          col={col}
          colWidth={colWidths[col.fieldName]}
          row={row}
        />
      );
    });

    const rowBorder = {
      borderBottomWidth : "1px",
      borderBottomStyle : "solid",
      borderBottomColor : grey300,
      height            : "38px",
      whiteSpace        : "nowrap",

    };

    return (
      <div
        data-id={rowKey}
        className={rowBorder}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >
        {bodyCells}
      </div>
    );
  }
}

PGBodyRow.propTypes = {
  cols      : React.PropTypes.array.isRequired,
  colWidths : React.PropTypes.object.isRequired,
  row       : React.PropTypes.object.isRequired,
  rowKey    : React.PropTypes.string,
};

export { PGBodyRow };
