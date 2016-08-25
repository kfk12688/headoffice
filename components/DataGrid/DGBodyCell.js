import React, { Component } from "react";
import styles from "./DGBodyCell.less";
import { renderDGCell } from "../DisplayElems";

class DGBodyCell extends Component {
  //
  // immutability issue
  //
  // shouldComponentUpdate(nextProps) {
  //   const nextPropskey = nextProps.col.dataKey;
  //   const nextPropsValue = nextProps.row[nextPropskey];
  //
  //   const currPropskey = this.props.col.dataKey;
  //   const currPropsValue = this.props.row[currPropskey];
  //
  //   console.log(this.props.col.renderType, currPropsValue, nextPropsValue, nextPropsValue !== currPropsValue);
  //   return nextPropsValue !== currPropsValue;
  // }

  render() {
    const { col, row, colWidth } = this.props;

    return (
      <div
        className={styles.cell}
        style={{ width : colWidth }}
      >
        {renderDGCell(col.renderType, row, col)}
      </div>
    );
  }
}

DGBodyCell.propTypes = {
  row        : React.PropTypes.object.isRequired,
  col        : React.PropTypes.object.isRequired,
  colWidth   : React.PropTypes.number.isRequired,
};

export { DGBodyCell };
