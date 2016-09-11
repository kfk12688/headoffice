import React, { Component } from "react";
import { connect } from "react-redux";
import { Entry, NavLinkBtn } from "components";
import { clearMenuState } from "dataflow/menu/actions";
import { loadSpec, addRow, deleteRow } from "dataflow/data/entry/actions";
import styles from "./EntryForm.less";

class EntryForm extends Component {
  constructor(props) {
    super(props);
    this.addRow = this.addRow.bind(this);
  }

  componentWillMount() {
    const { id: templateId } = this.props.params;
    this.props.loadSpec({ templateId });
  }

  addRow(rowData) {
    const { entryStore : { id : templateId } } = this.props;

    this.props.addRow({
      templateId,
      data : rowData,
    });
  }

  render() {
    const { entryStore } = this.props;
    const { spec, data, loadingIndicators, id, templateName } = entryStore;

    return (
      <div className={styles.container}>
        {/* Sidebar Container */}
        <div className={styles.sidebar}>
          <NavLinkBtn to="/data" faName="times-circle-o">Close View</NavLinkBtn>
          <NavLinkBtn to={`/data/view/${id}`} faName="arrow-circle-o-right">Goto Data View</NavLinkBtn>
        </div>

        {/* DataGrid Container */}
        <Entry
          className={styles.entrygrid}
          templateName={templateName}
          spec={spec}
          data={data}
          isLoading={loadingIndicators}
          onSubmit={this.addRow}
        />
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
  deleteRow      : React.PropTypes.func,
};

const mapStateToProps = state => ({
  entryStore : state.data.entry,
});

const mapDisptachToProps = dispatch => ({
  clearMenuState : () => dispatch(clearMenuState()),
  loadSpec       : (params) => dispatch(loadSpec(params)),
  addRow         : params => dispatch(addRow(params)),
  deleteRow      : params => dispatch(deleteRow(params)),
});

export default connect(mapStateToProps, mapDisptachToProps)(EntryForm);
