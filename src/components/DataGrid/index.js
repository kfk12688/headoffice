import { isEmpty } from "utils";
import React, { Component, PropTypes } from "react";
import { DGHeaderRow } from "./DGHeaderRow";
import { DGBody } from "./DGBody";
import styles from "./common.less";

class DataGrid extends Component {
  constructor(props) {
    super(props);
    this.state = {
      colWidths  : props.colWidths,
      scrollLeft : 0,
    };

    this.resize             = this.resize.bind(this);
    this.reportScrollLeftFn = this.reportScrollLeftFn.bind(this);
    this.renderContent      = this.renderContent.bind(this);
  }

  reportScrollLeftFn(spacing) {
    this.setState({ scrollLeft : spacing });
  }

  resize(colKey, domElement, newPos) {
    let colWidths  = this.state.colWidths;
    const oldPos   = domElement.getBoundingClientRect();
    const newWidth = colWidths[colKey] + (newPos - oldPos.right);
    colWidths      = {
      ...colWidths,
      [colKey] : newWidth,
    };

    this.setState({ colWidths });
  }

  renderContent() {
    const { isLoading, rows, cols, onRowClick } = this.props;

    if (isLoading) {
      return <div className={styles.spinner}><i className="fa fa-spinner fa-spin fa-2x fa-fw"/></div>;
    } else if (isEmpty(rows)) {
      return <div className={styles.noData}>No Data Present</div>;
    }

    return (
      <DGBody cols={cols}
              rows={rows}
              onRowClick={onRowClick}
              colWidths={this.state.colWidths}
              reportScrollLeftFn={this.reportScrollLeftFn}
      />
    );
  }

  render() {
    const { cols } = this.props;

    return (
      <div className={styles.dgContainer}>
        <DGHeaderRow cols={cols}
                     colWidths={this.state.colWidths}
                     onDrag={this.resize}
                     scrollLeft={this.state.scrollLeft}
        />

        {this.renderContent()}
      </div>
    );
  }
}

DataGrid.propTypes = {
  isLoading  : PropTypes.bool,
  rows       : PropTypes.object.isRequired,
  cols       : PropTypes.arrayOf(PropTypes.object),
  colWidths  : PropTypes.object.isRequired,
  // functions
  onRowClick : PropTypes.func,
};

export { DataGrid };
