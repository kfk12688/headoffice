import React from "react";
import { Sticky } from "react-sticky";
import { Button } from "components";
import _ from "underscore";
import { SDHeaderRow } from "./SDHeaderRow";
import { SDBody } from "./SDBody";
import SDForm from "./SDForm";
import styles from "./common.less";

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

  renderBody() {
    const { colSpec, data, isLoading } = this.props;

    if (isLoading) {
      return <div className={styles.spinner}><i className="fa fa-spinner fa-spin fa-2x fa-fw"/></div>;
    } else if (_.isEmpty(data)) {
      return <div className={styles.noData}>No Data Present</div>;
    }

    return (
      <SDBody
        cols={colSpec}
        colWidths={this.state.colWidths}
        rows={data}
      />
    );
  }

  renderContent(mode) {
    const { colSpec, onSubmit } = this.props;

    if (mode === VIEW_MODE) {
      return (
        <div className={styles.sdContainer}>
          <SDHeaderRow
            cols={colSpec}
            colWidths={this.state.colWidths}
          />
          {this.renderBody()}
        </div>
      );
    } else if (mode === ADD_MODE) {
      return (
        <div className={styles.sdContainer}>
          <SDForm onSubmit={onSubmit}/>
        </div>
      );
    }
    return null;
  }

  render() {
    const { className, data, name } = this.props;

    return (
      <div className={className}>
        <Sticky stickyStyle={{ zIndex : 1040, backgroundColor : "white" }}>
          <div className="row" style={{ paddingTop : "8px", paddingBottom : "8px" }}>
            <div className="col-md-12">
              <h4>{name}&nbsp;
                <small className="text-muted">({data && data.length || 0} Fields)</small>
                <div className="pull-right">
                  {
                    this.state.mode === VIEW_MODE ?
                    <Button faName="plus" style="primary" onClick={this.toggleAddMode}>Add new Field</Button> :
                    <Button style="primary" faName="long-arrow-left" onClick={this.toggleViewMode}>Go Back</Button>
                  }
                </div>
              </h4>
            </div>
          </div>
        </Sticky>
        {this.renderContent(this.state.mode)}
      </div>
    );
  }
}

SpecDefiner.propTypes = {
  className : React.PropTypes.string,
  name      : React.PropTypes.string,
  colWidths : React.PropTypes.object.isRequired,
  colSpec   : React.PropTypes.object.isRequired,
  data      : React.PropTypes.arrayOf(React.PropTypes.object),
  isLoading : React.PropTypes.bool,
  onSubmit  : React.PropTypes.func.isRequired,
};

export { SpecDefiner };
