/**
 * Created by sharavan on 18/05/16.
 */
import React, { Component, PropTypes } from "react";
import { DGHeaderRow } from "./DGHeaderRow";
import { DGBody } from "./DGBody";
import FontAwesome from "react-fontawesome";
import styles from "./DG.less";
import cx from "classnames";

class DG extends Component {
  constructor(props) {
    super(props);
    this.state = { colWidths : props.colWidths };
  }

  render() {
    const {
      style, className, cols, colWidths, colSortFunction,
      sortKey, sortAscending, selectedKeys, onRowClick, rows, isLoading
    } = this.props;

    return (
      <div
        className={cx(styles.dgBase, className)}
        style={style}
      >
        <DGHeaderRow
          cols={cols}
          colWidths={this.state.colWidths}
          onClick={colSortFunction}
          sortKey={sortKey}
          sortAscending={sortAscending}
        />

        {
          isLoading ?
          <FontAwesome className={styles.spinner} name="spinner" spin size="2x"/> :
          <DGBody
            cols={cols}
            colWidths={this.state.colWidths}
            rows={rows}
            selectedKeys={selectedKeys}
            onRowClick={onRowClick}
          />
        }
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
