import React, { Component } from "react";
import { DGBodyRow } from "./DGBodyRow";
import { imap } from "utils";
import styles from "./common.less";

class DGBody extends Component {
  constructor(props) {
    super(props);
    this.getRows            = this.getRows.bind(this);
    this.reportScrollLeftFn = this.reportScrollLeftFn.bind(this);
  }

  getRows() {
    const { rows, cols, colWidths, onRowClick } = this.props;
    const rowTransformer                        = (row, key) => <DGBodyRow key={key}
                                                                           row={row}
                                                                           cols={cols}
                                                                           rowKey={key}
                                                                           colWidths={colWidths}
                                                                           onRowClick={onRowClick}/>;
    return imap(rowTransformer, rows);
  }

  reportScrollLeftFn(e) {
    e.preventDefault();
    const node = this.refs.dgBody;
    this.props.reportScrollLeftFn(node.scrollLeft);
  }

  render() {
    return (
      <div ref="dgBody" onScroll={this.reportScrollLeftFn} className={styles.dgBody}>
        {this.getRows()}
      </div>
    );
  }
}

DGBody.propTypes = {
  rows               : React.PropTypes.object.isRequired,
  cols               : React.PropTypes.arrayOf(React.PropTypes.object),
  colWidths          : React.PropTypes.object.isRequired,
  onRowClick         : React.PropTypes.func.isRequired,
  reportScrollLeftFn : React.PropTypes.func.isRequired,
};

export { DGBody };
