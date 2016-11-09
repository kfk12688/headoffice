import React, {Component} from "react";
import _ from "underscore";
import {white} from "../_styles/colors";
import {DGBodyRow} from "./DGBodyRow";

class DGBody extends Component {
  constructor(props) {
    super(props);
    this.getRows = this.getRows.bind(this);
    this.reportScrollLeftFn = this.reportScrollLeftFn.bind(this);
  }

  getRows() {
    const {rows, cols, colWidths, selectedKeys, onRowClick} = this.props;
    const datagridBodyRows = [];

    _.forEach(rows, row => {
      const selectedKeyIdx = selectedKeys.findIndex((key) => key === row.id);

      datagridBodyRows.push(
        <DGBodyRow
          key={row.id}
          rowKey={row.id}
          cols={cols}
          row={row}
          colWidths={colWidths}
          onRowClick={onRowClick}
          isRowSelected={selectedKeyIdx !== -1}
        />
      );
    });

    return datagridBodyRows;
  }

  reportScrollLeftFn(e) {
    e.preventDefault();
    const node = this.refs.dgBody;
    this.props.reportScrollLeftFn(node.scrollLeft);
  }

  render() {
    const bodyStyle = {
      backgroundColor: white,
      overflow: "auto",
    };

    return (
      <div
        ref="dgBody"
        style={bodyStyle}
        onScroll={this.reportScrollLeftFn}
      >
        <div>{this.getRows()}</div>
      </div>
    );
  }

}

DGBody.propTypes = {
  rows: React.PropTypes.object.isRequired,
  cols: React.PropTypes.arrayOf(React.PropTypes.object),
  colWidths: React.PropTypes.object.isRequired,
  selectedKeys: React.PropTypes.array.isRequired,
  onRowClick: React.PropTypes.func.isRequired,
  reportScrollLeftFn: React.PropTypes.func.isRequired,
};

export {DGBody};
