import React, { Component } from "react";
import _ from "underscore";
import { EGBodyRow } from "./EGBodyRow";
import styles from "./EGBody.less";

class EGBody extends Component {
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
        <EGBodyRow
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
    const node = this.refs.egBody;
    this.props.reportScrollLeftFn(node.scrollLeft);
  }

  render() {
    return (
      <div
        ref="egBody"
        className={styles.body}
        onScroll={this.reportScrollLeftFn}
      >
        <div className={styles.slice}>
          {this.getRows()}
        </div>
      </div>
    );
  }
}

EGBody.propTypes = {
  cols               : React.PropTypes.array.isRequired,
  colWidths          : React.PropTypes.object.isRequired,
  rows               : React.PropTypes.object.isRequired,
  reportScrollLeftFn : React.PropTypes.func.isRequired,
};

export { EGBody };
