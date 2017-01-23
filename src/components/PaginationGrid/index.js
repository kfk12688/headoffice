import React, { Component } from "react";
import { PGHeaderRow } from "./PGHeaderRow";
import { PGBody } from "./PGBody";
import { Link } from "components";
import { calcColWidths, isDefined, isEmpty } from "utils";
import styles from "./common.less";

class PaginationGrid extends Component {
  constructor(props) {
    super(props);
    const colWidths = calcColWidths(props.spec, props.data);
    this.state      = {
      colWidths,
      scrollLeft : 0,
    };

    this.reportScrollLeftFn = this.reportScrollLeftFn.bind(this);
    this.renderContent      = this.renderContent.bind(this);
  }

  reportScrollLeftFn(spacing) {
    this.setState({ scrollLeft : spacing });
  }

  renderContent() {
    const { isLoading, spec, data, name } = this.props;
    const colWidths                       = calcColWidths(spec, data);

    if (isLoading) {
      return <div className={styles.spinner}><i className="fa fa-spinner fa-spin fa-2x fa-fw"/></div>;
    }

    if (!isDefined(data) || isEmpty(data)) {
      return (
        <div className={styles.noData}>
          <div>No Data Present</div>
          <div>Click <Link to={`/collections/entry/${name}`}>here</Link> to create them</div>
        </div>
      );
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
    const colWidths                 = calcColWidths(spec, data);

    return (
      <div className={styles.pgContainer}>
        <PGHeaderRow
          cols={spec}
          colWidths={colWidths}
          scrollLeft={this.state.scrollLeft}
          topOffset={topOffset}
        />
        {this.renderContent()}
      </div>
    );
  }
}

PaginationGrid.propTypes = {
  name      : React.PropTypes.string,
  topOffset : React.PropTypes.number,
  style     : React.PropTypes.object,
  className : React.PropTypes.string,
  isLoading : React.PropTypes.bool,
  spec      : React.PropTypes.array.isRequired,
  data      : React.PropTypes.object.isRequired,
};

export { PaginationGrid };
