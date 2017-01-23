import R from "ramda";
import React, { Component } from "react";
import { DGBodyCell } from "./DGBodyCell";
import { grey50, transparent, blueGrey50 } from "../_styles/colors";
import styles from "./common.less";
import { imap } from "utils";

class DGBodyRow extends Component {
  constructor() {
    super();
    this.state        = { hovered : false };
    this.clickHandler = this.clickHandler.bind(this);
  }

  getBodyCells() {
    const { cols, row, colWidths } = this.props;
    const getBodyCells             = (col, index) => {
      const { name, dataKey } = col;
      let value               = R.path(R.split(".", dataKey), row);
      if (R.isNil(value)) value = false;
      return (
        <DGBodyCell id={row.name}
                    col={col}
                    key={`${row.id} ${index}`}
                    value={value}
                    colWidth={colWidths[name]}
        />
      );
    };
    return imap(getBodyCells, cols);
  }

  clickHandler(e) {
    if ((e.target.tagName !== "A") && (e.target.tagName !== "BUTTON")) {
      this.props.onRowClick(this.props.rowKey);
    }
  }

  render() {
    const isRowSelected = this.props.row.isSelected;

    let rowColor = transparent;
    if (isRowSelected) {
      rowColor = blueGrey50;
    } else if (this.state.hovered) {
      rowColor = grey50;
    }

    let rowStyle = { backgroundColor : rowColor };

    return (
      <div style={rowStyle}
           className={styles.row}
           onMouseEnter={() => this.setState({ hovered : true })}
           onMouseLeave={() => this.setState({ hovered : false })}
           onClick={this.clickHandler}
      >
        {this.getBodyCells()}
      </div>
    );
  }
}

DGBodyRow.propTypes = {
  onRowClick : React.PropTypes.func,
  rowKey     : React.PropTypes.string.isRequired,
  row        : React.PropTypes.object,
  cols       : React.PropTypes.arrayOf(React.PropTypes.object),
  colWidths  : React.PropTypes.object,
};

export { DGBodyRow };
