import _ from "underscore";
import React, { Component } from "react";
import { PGHeaderRow } from "./PGHeaderRow";
import { PGBody } from "./PGBody";
import calcColWidths from "../calculateColWidths";
import cx from "classnames";
import styles from "./common.less";

class PaginationGrid extends Component {
  constructor(props) {
    super(props);
    const colWidths = calcColWidths(props.spec, props.data);
    this.state = {
      colWidths,
      scrollLeft : 0,
    };

    this.reportScrollLeftFn = this.reportScrollLeftFn.bind(this);
    this.renderContent = this.renderContent.bind(this);
  }

  reportScrollLeftFn(spacing) {
    this.setState({ scrollLeft : spacing });
  }

  renderContent() {
    const { isLoading, spec, data } = this.props;
    const colWidths = calcColWidths(spec, data);
    let PGBodyElement = null;

    if (isLoading) {
      PGBodyElement = <i className={cx("fa fa-spinner fa-2x", styles.spinner)}/>;
    } else if (_.isEmpty(data)) {
      PGBodyElement = <div className={styles.egBody}>No Data Present</div>;
    } else {
      PGBodyElement = (
        <PGBody
          cols={spec}
          rows={data}
          colWidths={colWidths}
          reportScrollLeftFn={this.reportScrollLeftFn}
        />
      );
    }

    return (
      <div className={styles.tableContainer}>
        <PGHeaderRow
          cols={spec}
          colWidths={colWidths}
          scrollLeft={this.state.scrollLeft}
        />
        {PGBodyElement}
      </div>
    );
  }

  render() {
    return (
      <div>
        {this.renderContent()}
      </div>
    );
  }
}

PaginationGrid.propTypes = {
  style     : React.PropTypes.object,
  className : React.PropTypes.string,
  isLoading : React.PropTypes.bool,
  spec      : React.PropTypes.array.isRequired,
  data      : React.PropTypes.object.isRequired,
};

export { PaginationGrid };
