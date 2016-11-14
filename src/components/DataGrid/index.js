import _ from "underscore";
import React, {Component, PropTypes} from "react";
import {DGHeaderRow} from "./DGHeaderRow";
import {DGBody} from "./DGBody";
import {grey500, white} from "../_styles/colors";
import cx from "classnames";
import styles from "./config.less"

class DataGrid extends Component {
  constructor(props) {
    super(props);
    this.state = {
      colWidths: props.colWidths,
      scrollLeft: 0,
    };

    this.resize = this.resize.bind(this);
    this.reportScrollLeftFn = this.reportScrollLeftFn.bind(this);
    this.renderContent = this.renderContent.bind(this);
  }

  reportScrollLeftFn(spacing) {
    this.setState({scrollLeft: spacing});
  }

  resize(colKey, domElement, newPos) {
    let colWidths = this.state.colWidths;
    const oldPos = domElement.getBoundingClientRect();
    const newWidth = colWidths[colKey] + (newPos - oldPos.right);
    colWidths = {
      ...colWidths,
      [colKey]: newWidth,
    };

    this.setState({colWidths});
  }

  renderContent() {
    const {isLoading, rows, cols, onRowClick, selectedKeys} = this.props;

    if (_.isEmpty(rows)) {
      return <div className={styles.dgBody}>No Data Present</div>;
    }

    if (isLoading) {
      return <i style={cx("fa fa-spinner fa-2x", styles.Spinner)}/>;
    }

    return (
      <DGBody
        cols={cols}
        colWidths={this.state.colWidths}
        rows={rows}
        selectedKeys={selectedKeys}
        onRowClick={onRowClick}
        reportScrollLeftFn={this.reportScrollLeftFn}
      />
    );
  }

  render() {
    const {cols, colSortFunction, sortKey, sortAscending} = this.props;

    return (
      <div
        style={{overflow: "hidden", backgroundColor: white} }
      >
        <DGHeaderRow
          cols={cols}
          colWidths={this.state.colWidths}
          onClick={colSortFunction}
          onDrag={this.resize}
          sortKey={sortKey}
          sortAscending={sortAscending}
          scrollLeft={this.state.scrollLeft}
        />

        {this.renderContent()}
      </div>
    );
  }
}

DataGrid.propTypes = {
  isLoading: PropTypes.bool,
  rows: PropTypes.object.isRequired,
  cols: PropTypes.arrayOf(PropTypes.object),
  colWidths: PropTypes.object.isRequired,
  sortKey: PropTypes.string,
  sortAscending: PropTypes.bool,
  selectedKeys: PropTypes.array,

  // functions
  colSortFunction: PropTypes.func,
  onRowClick: PropTypes.func,
};

export {DataGrid};
