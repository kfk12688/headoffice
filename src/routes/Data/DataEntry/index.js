import React, { Component } from "react";
import { connect } from "react-redux";
import { Entry, NavLinkBtn } from "components";
import { clearMenuState } from "dataflow/menu/actions";
import { loadSpec, addRow } from "dataflow/data/entry/actions";

class EntryForm extends Component {
  constructor(props) {
    super(props);
    this.addRow = this.addRow.bind(this);
  }

  componentWillMount() {
    const { id: templateID } = this.props.params;
    this.props.loadSpec({ templateID });
  }

  addRow(rowData) {
    const { entryStore : { id : templateID } } = this.props;
    this.props.addRow({
      templateID,
      data : rowData,
    });
  }

  render() {
    const { entryStore } = this.props;
    const { spec, data, loadingIndicators, id, templateName } = entryStore;

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
          <NavLinkBtn to="data" faName="times-circle-o">Close View</NavLinkBtn>
          <NavLinkBtn to={`data/view/${id}`} faName="arrow-circle-o-right">Goto Data View</NavLinkBtn>
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
  clearMenuState : React.PropTypes.func.isRequired,
  loadSpec       : React.PropTypes.func,
  addRow         : React.PropTypes.func,
};

const mapStateToProps = state => ({
  entryStore : state.data.entry,
});

const mapDisptachToProps = dispatch => ({
  clearMenuState : () => dispatch(clearMenuState()),
  loadSpec       : (params) => dispatch(loadSpec(params)),
  addRow         : params => dispatch(addRow(params)),
});

export default connect(mapStateToProps, mapDisptachToProps)(EntryForm);
