import React from "react";
import  { Sticky } from "react-sticky";
import { Button } from "components";
import { SDHeaderRow } from "./SDHeaderRow";
import { SDBody } from "./SDBody";
import SDForm from "./SDForm";
import styles from "./common.less";
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
          <div className={cx("row", styles.metaContainer)}>
            <Sticky>
              <div className="col-md-6">{data && data.length} Fields</div>
              <div className="col-md-6 text-md-right">
                <Button faName="plus" style="primary" onClick={this.toggleAddMode}>Add new Field</Button>
              </div>
            </Sticky>
          </div>

          <div className="row">
            <div className="col-md-12">
              <div className={styles.tableContainer}>
                <Sticky>
                  <SDHeaderRow
                    cols={colSpec}
                    colWidths={this.state.colWidths}
                  />
                </Sticky>

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
        </div>
      );
    } else if (mode === ADD_MODE) {
      return (
        <div>
          <div className={cx("row", styles.metaContainer)}>
            <div className="col-md-6">{data && data.length} Fields</div>
            <div className="col-md-6 text-md-right">
              <Button style="primary" faName="long-arrow-left" onClick={this.toggleViewMode}>Go Back</Button>
            </div>
          </div>

          <div className={cx("row", styles.metaContainer)}>
            <div className="col-md-12">
              <SDForm onSubmit={onSubmit}/>
            </div>
          </div>
        </div>
      );
    }

    return null;
  }

  render() {
    const { className, style } = this.props;

    return (
      <div className={className}
           style={style}>
        {this.renderContent(this.state.mode)}
      </div>
    );
  }
}

SpecDefiner.propTypes = {
  className : React.PropTypes.string,
  style     : React.PropTypes.string,
  colWidths : React.PropTypes.object.isRequired,
  colSpec   : React.PropTypes.object.isRequired,
  data      : React.PropTypes.arrayOf(React.PropTypes.object),
  isLoading : React.PropTypes.bool,
  onSubmit  : React.PropTypes.func.isRequired,
};

export { SpecDefiner };
