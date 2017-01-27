import React from "react";
import { isEmpty } from "utils";
import { SDHeaderRow } from "./SDHeaderRow";
import { SDBody } from "./SDBody";
import styles from "./styles.less";

class SDTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = { colWidths : props.colWidths };
  }

  renderBody() {
    const { colSpec, data, isLoading } = this.props;

    if (isLoading) {
      return <div className={styles.spinner}><i className="fa fa-spinner fa-spin fa-2x fa-fw"/></div>;
    } else if (isEmpty(data)) {
      return <div className={styles.noData}>No Data Present</div>;
    }

    return (
      <SDBody cols={colSpec}
              colWidths={this.state.colWidths}
              rows={data}
      />
    );
  }

  render() {
    const { colSpec } = this.props;

    return (
      <div className={styles.sdContainer}>
        <SDHeaderRow cols={colSpec}
                     colWidths={this.state.colWidths}
        />
        {this.renderBody()}
      </div>
    );
  }
}

SDTable.propTypes = {
  colSpec   : React.PropTypes.object.isRequired,
  colWidths : React.PropTypes.object.isRequired,
  data      : React.PropTypes.arrayOf(React.PropTypes.object),
  isLoading : React.PropTypes.bool,
};

export { SDTable };
