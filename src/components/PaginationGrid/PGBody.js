import React, { Component } from "react";
import _ from "underscore";
import { PGBodyRow } from "./PGBodyRow";

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
    const node = this.refs.egBody;
    this.props.reportScrollLeftFn(node.scrollLeft);
  }

  render() {
    const bodyStyle = {
      overflowX : "auto",
      minHeight : "300px",
    };

    return (
      <div
        ref="egBody"
        style={bodyStyle}
        onScroll={this.reportScrollLeftFn}
      >
        <div>
          {this.getRows()}
        </div>
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
