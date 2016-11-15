import React, { Component } from "react";
import { connect } from "react-redux";
import { Entry, NavLink } from "components";
import { loadSpec, addRow } from "dataflow/collections/actions";

class EntryForm extends Component {
  constructor(props) {
    super(props);
    this.addRow = this.addRow.bind(this);
  }

  componentWillMount() {
    const { collectionName } = this.props.params;
    this.props.loadSpec(collectionName);
  }

  addRow(rowData) {
    const { collectionName } = this.props.params;
    this.props.addRow(collectionName, rowData);
  }

  render() {
    const { entryStore, params } = this.props;
    const { collectionName } = params;
    const { spec, data, loadingIndicators, templateName } = entryStore;

    return (
      <div className="row">
        {/* DataGrid Container */}
        <Entry
          className="col-md-8 offset-md-1"
          templateName={templateName}
          spec={spec}
          data={data}
          isLoading={loadingIndicators}
          onSubmit={this.addRow}
        />

        {/* Sidebar Container */}
        <div className="col-md-2">
          <NavLink to="data" faName="times-circle-o">Close View</NavLink>
          <NavLink to={`data/view/${collectionName}`} faName="arrow-circle-o-right">Goto Data View</NavLink>
        </div>
      </div>
    );
  }
}

EntryForm.propTypes = {
  // route
  params : React.PropTypes.object,

  // state
  entryStore : React.PropTypes.object.isRequired,

  // actions
  loadSpec : React.PropTypes.func,
  addRow   : React.PropTypes.func,
};

const mapStateToProps = state => ({
  entryStore : state.collections,
});

const mapDisptachToProps = dispatch => ({
  loadSpec : (collectionName) => dispatch(loadSpec(collectionName)),
  addRow   : (collectionName, data) => dispatch(addRow(collectionName, data)),
});

export default connect(mapStateToProps, mapDisptachToProps)(EntryForm);
