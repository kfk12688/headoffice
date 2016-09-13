import _ from "underscore";
import React, { Component } from "react";
import { EGHeaderRow } from "./EGHeaderRow";
import { EGBody } from "./EGBody";
import calcColWidths from "../calculateColWidths";
import cx from "classnames";
import styles from "./EG.less";

class EntryGrid extends Component {
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
    let EGBodyElement = null;

    if (isLoading) {
      EGBodyElement = <i className={cx("fa fa-spinner fa-2x", styles.spinner)}/>;
    } else if (_.isEmpty(data)) {
      EGBodyElement = <div className={styles.egBody}>No Data Present</div>;
    } else {
      EGBodyElement = (
        <EGBody
          cols={spec}
          rows={data}
          colWidths={colWidths}
          reportScrollLeftFn={this.reportScrollLeftFn}
        />
      );
    }

    return (
      <div className={styles.tableContainer}>
        <EGHeaderRow
          cols={spec}
          colWidths={colWidths}
          scrollLeft={this.state.scrollLeft}
        />
        {EGBodyElement}
      </div>
    );
  }

  render() {
    const { style, className, data } = this.props;

    return (
      <div
        className={cx(styles.base, className)}
        style={style}
      >
        {/* Table Nav and Meta Container */}
        <div className={styles.tableMetaContainer}>
          <select>
            <option value="10">10</option>
            <option value="15">15</option>
            <option value="20">20</option>
          </select>
          <div>
            <i className="fa fa-angle-double-left"></i>
            <i className="fa fa-angle-left"></i>
            <i className="fa fa-angle-right"></i>
            <i className="fa fa-angle-double-right"></i>
          </div>
          <div className={styles.rightAlign}>{Object.keys(data).length} Entries</div>
        </div>

        {this.renderContent()}
      </div>
    );
  }
}

EntryGrid.propTypes = {
  style     : React.PropTypes.object,
  className : React.PropTypes.string,
  isLoading : React.PropTypes.object,
  spec      : React.PropTypes.array.isRequired,
  data      : React.PropTypes.object.isRequired,
};

export { EntryGrid };
