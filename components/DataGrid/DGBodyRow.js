import React, { Component } from "react";
import { DGBodyCell } from "./DGBodyCell";
import { grey50, transparent, blueGrey50 } from "../../styles/colors";
import styles from "./DGBodyRow.less";

class DGBodyRow extends Component {
  constructor() {
    super();
    this.state = { hovered : false };
    this.clickHandler = this.clickHandler.bind(this);
  }

  getBodyCells() {
    const { cols, row, colWidths, isRowSelected } = this.props;
    const dataGridBodyCells = cols.map((col, index) => {
      const colName = col.name;

      if (col.renderType === "checkbox") {
        row.isSelected = isRowSelected;
      }

      return (
        <DGBodyCell
          key={`${row._id} ${index}`}
          col={col}
          colWidth={colWidths[colName]}
          row={row}
        />
      );
    });

    return dataGridBodyCells;
  }

  clickHandler(e) {
    if ((e.target.tagName !== "A") && (e.target.tagName !== "BUTTON")) {
      this.props.onRowClick(this.props.rowKey);
    }
  }

  render() {
    const { isRowSelected } = this.props;
    let rowStyle = {
      backgroundColor : isRowSelected ?
                        blueGrey50 :
                        this.state.hovered ?
                        grey50 :
                        transparent,
    };

    return (
      <div
        style={rowStyle}
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
  onRowClick    : React.PropTypes.func,
  rowKey        : React.PropTypes.string.isRequired,
  isRowSelected : React.PropTypes.bool,
  row           : React.PropTypes.object,
  cols          : React.PropTypes.arrayOf(React.PropTypes.object),
  colWidths     : React.PropTypes.object,
};

export { DGBodyRow };
