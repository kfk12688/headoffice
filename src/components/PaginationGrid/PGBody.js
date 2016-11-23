import React, { Component } from "react";
import _ from "underscore";
import { PGBodyRow } from "./PGBodyRow";
import styles from "./common.less";

class PGBody extends Component {
  constructor(props) {
    super(props);

    this.getRows = this.getRows.bind(this);
    this.reportScrollLeftFn = this.reportScrollLeftFn.bind(this);
  }

  getRows() {
    const { rows, cols, colWidths } = this.props;
    const bodyRows = [];

    _.forEach(rows, (row, rowKey) => {
      bodyRows.push(
        <PGBodyRow
          key={rowKey}
          rowKey={rowKey}
          colWidths={colWidths}
          cols={cols}
          row={row}
        />
      );
    });

    return bodyRows;
  }

  reportScrollLeftFn(e) {
    e.preventDefault();
    const node = this.refs.pgBody;
    this.props.reportScrollLeftFn(node.scrollLeft);
  }

  render() {
    return (
      <div
        ref="pgBody"
        className={styles.pgBody}
        onScroll={this.reportScrollLeftFn}
      >
        {this.getRows()}
      </div>
    );
  }
}

PGBody.propTypes = {
  cols               : React.PropTypes.array.isRequired,
  colWidths          : React.PropTypes.object.isRequired,
  rows               : React.PropTypes.object.isRequired,
  reportScrollLeftFn : React.PropTypes.func.isRequired,
};

export { PGBody };
