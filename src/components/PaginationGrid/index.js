import React, { Component } from "react";
import { Link } from "components";
import { isDefined, isEmpty } from "utils";
import { PGHeaderRow } from "./PGHeaderRow";
import { PGBody } from "./PGBody";
import { calcColWidths } from "./calcColWidths";
import styles from "./styles.less";

class PaginationGrid extends Component {
  constructor(props) {
    super(props);
    const colWidths = calcColWidths(props.spec, props.data);
    this.state      = {
      scrollLeft : 0,
      colWidths,
    };

    this.reportScrollLeftFn = this.reportScrollLeftFn.bind(this);
    this.renderContent      = this.renderContent.bind(this);
  }

  componentWillReceiveProps(nextProps, nextContext) {
    const colWidths = calcColWidths(nextProps.spec, nextProps.data);
    this.setState({ colWidths });
  }

  reportScrollLeftFn(spacing) {
    this.setState({ scrollLeft : spacing });
  }

  renderContent() {
    const { isLoading, spec, data, name } = this.props;

    if (isLoading) {
      return <div className={styles.spinner}><i className="fa fa-spinner fa-spin fa-2x fa-fw"/></div>;
    }

    if (!isDefined(data) || isEmpty(data)) {
      return (
        <div className={styles.noData}>
          <div>No Data Present</div>
          <div>Click <Link to={`/collections/new/${name}`}>here</Link> to create them</div>
        </div>
      );
    }

    return (
      <PGBody cols={spec}
              rows={data}
              editItem={this.props.editItem}
              colWidths={this.state.colWidths}
              deleteItem={this.props.deleteItem}
              reportScrollLeftFn={this.reportScrollLeftFn}
      />
    );
  }

  render() {
    const { spec, topOffset } = this.props;

    return (
      <div className={styles.pgContainer}>
        <PGHeaderRow cols={spec}
                     topOffset={topOffset}
                     colWidths={this.state.colWidths}
                     scrollLeft={this.state.scrollLeft}
        />
        {this.renderContent()}
      </div>
    );
  }
}

PaginationGrid.propTypes = {
  name       : React.PropTypes.string,
  topOffset  : React.PropTypes.number,
  style      : React.PropTypes.object,
  className  : React.PropTypes.string,
  isLoading  : React.PropTypes.bool,
  spec       : React.PropTypes.array.isRequired,
  data       : React.PropTypes.object.isRequired,
  editItem   : React.PropTypes.func.isRequired,
  deleteItem : React.PropTypes.func.isRequired,
};

export { PaginationGrid };
