import React from "react";
import { Button } from "components";
import { SDHeaderRow } from "./SDHeaderRow";
import { SDBody } from "./SDBody";
import { SDPost } from "./SDPost";
import styles from "./SD.less";
import cx from "classnames";

const VIEW_MODE = 0;
const ADD_MODE = 1;

class SpecDefiner extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mode      : VIEW_MODE,
      colWidths : props.colWidths,
    };

    this.toggleAddMode = this.toggleAddMode.bind(this);
    this.toggleViewMode = this.toggleViewMode.bind(this);
    this.renderContent = this.renderContent.bind(this);
  }

  toggleAddMode() {
    this.setState({ mode : ADD_MODE });
  }

  toggleViewMode() {
    this.setState({ mode : VIEW_MODE });
  }

  renderContent(mode) {
    const { colSpec, data, isLoading, onSubmit } = this.props;

    if (mode === VIEW_MODE) {
      return (
        <div>
          <div className={styles.info}>
            <div className={styles.meta}>{data && data.length} Fields</div>
            <Button className={styles.btn} accent onClick={this.toggleAddMode}>Add new Field</Button>
          </div>

          <div className={styles.content}>
            <div className={styles.table}>
              <SDHeaderRow
                cols={colSpec}
                colWidths={this.state.colWidths}
              />

              {
                isLoading ?
                <i className={cx("fa fa-spinner fa-2x", styles.spinner)}/> :
                <SDBody
                  cols={colSpec}
                  colWidths={this.state.colWidths}
                  rows={data}
                />
              }
            </div>
          </div>
        </div>
      );
    } else if (mode === ADD_MODE) {
      return (
        <div>
          <div className={styles.info}>
            <div className={styles.meta}>{data && data.length} Fields</div>
            <Button className={styles.btn} bordered onClick={this.toggleViewMode}>Back</Button>
          </div>

          <SDPost
            className={styles.content}
            cols={colSpec}
            onSubmit={onSubmit}
          />
        </div>
      );
    }

    return null;
  }

  render() {
    const { className } = this.props;

    return (
      <div className={cx(styles.base, className)}>
        {this.renderContent(this.state.mode)}
      </div>
    );
  }
}

SpecDefiner.propTypes = {
  className : React.PropTypes.string,
  colWidths : React.PropTypes.object.isRequired,
  colSpec   : React.PropTypes.object.isRequired,
  data      : React.PropTypes.arrayOf(React.PropTypes.object),
  isLoading : React.PropTypes.bool,
  onSubmit  : React.PropTypes.func.isRequired,
};

export { SpecDefiner };
