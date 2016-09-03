/**
 * Created by sharavan on 18/05/16.
 */
import React, { Component, PropTypes } from "react";
import { DGHeaderRow } from "./DGHeaderRow";
import { DGBody } from "./DGBody";
import styles from "./DG.less";
import cx from "classnames";

class DataGrid extends Component {
  constructor(props) {
    super(props);
    this.state = { colWidths : props.colWidths };
  }

  render() {
    const {
      style, className, cols, colSortFunction,
      sortKey, sortAscending, selectedKeys, onRowClick, rows, isLoading,
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
          <i className={cx("fa fa-spinner fa-2x", styles.spinner)}/> :
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

DataGrid.propTypes = {
  className         : PropTypes.string,
  style             : PropTypes.object,
  isLoading         : PropTypes.bool,
  rows              : PropTypes.object.isRequired,
  cols              : PropTypes.arrayOf(PropTypes.object),
  colWidths         : PropTypes.object.isRequired,
  sortAscending     : PropTypes.boolean,
  selectedKeys      : PropTypes.array,
  sortKey           : PropTypes.string,
  colResizeFunction : PropTypes.func,
  colSortFunction   : PropTypes.func,
  onRowClick        : PropTypes.func,
};

export { DataGrid };
