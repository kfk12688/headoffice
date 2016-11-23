import _ from "underscore";
import React, { Component } from "react";
import { Sticky } from "react-sticky";
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

    if (isLoading) {
      return <i className={cx("fa fa-spinner fa-2x", styles.spinner)}/>;
    }

    if (_.isEmpty(data)) {
      return <div className={styles.egBody}>No Data Present</div>;
    }

    return (
      <PGBody
        cols={spec}
        rows={data}
        colWidths={colWidths}
        reportScrollLeftFn={this.reportScrollLeftFn}
      />
    );
  }

  render() {
    const { spec, topOffset, data } = this.props;
    const colWidths = calcColWidths(spec, data);

    return (
      <div className={styles.pgContainer}>
        <Sticky topOffset={-topOffset}
                stickyStyle={{
                  zIndex    : 100,
                  overflow  : "auto",
                  marginTop : topOffset,
                }}
        >
          <PGHeaderRow
            cols={spec}
            colWidths={colWidths}
            scrollLeft={this.state.scrollLeft}
          />
        </Sticky>
        {this.renderContent()}
      </div>
    );
  }
}

PaginationGrid.propTypes = {
  topOffset : React.PropTypes.number,
  style     : React.PropTypes.object,
  className : React.PropTypes.string,
  isLoading : React.PropTypes.bool,
  spec      : React.PropTypes.array.isRequired,
  data      : React.PropTypes.object.isRequired,
};

export { PaginationGrid };
