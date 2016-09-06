import React, { Component } from "react";
import { connect } from "react-redux";
import { EntryGrid } from "components";
import { TitleBar } from "./TitleBar";
import { clearMenuState } from "../../../dataflow/menu/actions";
import { loadSpec, addRow, deleteRow } from "../../../dataflow/content/entry/actions";
import styles from "./Editor.less";

class Editor extends Component {
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
    // console.log({
    //   templateId,
    //   row : rowData,
    // });

    this.props.addRow({
      templateId,
      data : rowData,
    });
  }

  render() {
    const { entryStore, contextMenuStore } = this.props;
    const { spec, data, loadingIndicators } = entryStore;

    return (
      <div>

        {/* Title Menu */}
        <TitleBar
          className={styles.titleBar}
          store={entryStore}
        />

        <div>
          {/* Sidebar Container */}
          {
            contextMenuStore.showSidebar &&
            <div className={styles.sidebar}/>
          }

          {/* DataGrid Container */}
          <EntryGrid
            className={styles.entrygrid}
            style={{ left : !contextMenuStore.showSidebar && 0 }}
            spec={spec}
            data={data}
            isLoading={loadingIndicators}
            onSubmit={this.addRow}
          />
        </div>
      </div>
    );
  }
}

Editor.propTypes = {
  // route
  params : React.PropTypes.object,

  // state
  entryStore       : React.PropTypes.object.isRequired,
  contextMenuStore : React.PropTypes.object.isRequired,

  // actions
  clearMenuState : React.PropTypes.func.isRequired,
  loadSpec       : React.PropTypes.func,
  addRow         : React.PropTypes.func,
  deleteRow      : React.PropTypes.func,
};

const mapStateToProps = state => ({
  entryStore       : state.content.entry,
  contextMenuStore : state.menu,
});

const mapDisptachToProps = dispatch => ({
  clearMenuState : () => dispatch(clearMenuState()),
  loadSpec       : (params) => dispatch(loadSpec(params)),
  addRow         : params => dispatch(addRow(params)),
  deleteRow      : params => dispatch(deleteRow(params)),
});

export default connect(mapStateToProps, mapDisptachToProps)(Editor);
