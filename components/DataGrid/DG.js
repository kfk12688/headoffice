/**
 * Created by sharavan on 18/05/16.
 */
import React, { Component, PropTypes } from "react";
import { DGHeaderRow } from "./DGHeaderRow";
import { DGBody } from "./DGBody";
import styles from "./DG.less";
import cx from "classnames";

class DG extends Component {
  constructor(props) {
    super(props);
    this.state = { colWidths : props.colWidths };
  }

  render() {
    return (
      <div
        className={cx(styles.dgBase, this.props.className)}
        style={this.props.style}
      >
        <DGHeaderRow
          cols={this.props.cols}
          colWidths={this.props.colWidths}
          onClick={this.props.colSortFunction}
          sortKey={this.props.sortKey}
          sortAscending={this.props.sortAscending}
        />
        <DGBody
          cols={this.props.cols}
          colWidths={this.state.colWidths}
          rows={this.props.rows}
          selectedKeys={this.props.selectedKeys}
          onRowClick={this.props.onRowClick}
        />
      </div>
    );
  }
}

DG.PropTypes = {
  rows              : PropTypes.object.isRequired,
  cols              : PropTypes.object.isRequired,
  colWidths         : PropTypes.object.isRequired,
  sortAscending     : PropTypes.boolean,
  selectedKeys      : PropTypes.array,
  sortKey           : PropTypes.string,
  colResizeFunction : PropTypes.func,
  colSortFunction   : PropTypes.func,
  onRowClick        : PropTypes.func,
};

export { DG };
