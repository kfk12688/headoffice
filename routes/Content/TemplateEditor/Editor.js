import React, { Component } from "react";
import { connect } from "react-redux";
import { SpecDefiner, FormButton } from "components";
import { TitleBar } from "./TitleBar";
import {
  loadEditor, editTemplate, editRow, deleteRow, clearEditFlag, addField
} from "../../../dataflow/content/editor/actions";
import styles from "./Editor.less";

class Editor extends Component {
  constructor(props) {
    super(props);
    this.addField = this.addField.bind(this);

    this.colSpec = {
      "action"         : {
        "headerStyle" : { borderLeft : 0 },
        "displayText" : "",
        "renderType"  : "action",
        "actions"     : [
          { name : "Edit Row", handler : props.editRow },
          { name : "Delete Row", handler : props.deleteRow }, // fixme
        ],
        "sortable"    : false,
        "insertable"  : false,
      },
      "fieldName"      : {
        "displayText" : "Field Name",
        "renderType"  : "text",
      },
      "fieldType"      : {
        "displayText" : "Field Type",
        "renderType"  : "text",
      },
      "fieldProps"     : {
        "displayText" : "Field Properties",
        "renderType"  : "label",
      },
    };
    this.colWidths = {
      action         : 45,
      fieldName      : 130,
      fieldType      : 120,
      fieldProps     : 450,
    };
  }

  componentWillMount() {
    this.props.loadEditorTable(this.props.params);
  }

  // Adds data to the redux data model
  addField(field) {
    this.props.addField(field);
  }

  render() {
    const { editor } = this.props;

    return (
      <div>

        {/* Title Menu */}
        <TitleBar
          className={styles.titleBar}
          store={editor}
          editTemplate={() => {}}
        />

        <div>
          {/* DataGrid Container */}
          <SpecDefiner
            className={styles.entrygrid}
            colSpec={this.colSpec}
            colWidths={this.colWidths}
            data={editor.userSchema}
            isLoading={editor.isLoading}
            postHandler={this.addField}
            selectedRow={editor.selectedRow}
            clearEditFlag={() => {}}
          />

          {/* Sidebar Container */}
          <div className={styles.sidebar}>
            <FormButton accent="green" className={styles.sidebarButton} onClick={this.saveData}>Save</FormButton>
            <FormButton accent="green" disabled className={styles.sidebarButton}>Undo</FormButton>
            <FormButton accent="green" disabled className={styles.sidebarButton}>Redo</FormButton>
            <FormButton accent="green" className={styles.sidebarButton}>Cancel</FormButton>
          </div>
        </div>
      </div>
    );
  }
}

Editor.propTypes = {
  // route
  params : React.PropTypes.object,

  // state
  editor : React.PropTypes.object.isRequired,

  // actions
  loadEditorTable : React.PropTypes.func.isRequired,
  editTemplate    : React.PropTypes.func.isRequired,
  editRow         : React.PropTypes.func.isRequired,
  deleteRow       : React.PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  editor : state.content.editor,
});

const mapDisptachToProps = dispatch => ({
  loadEditorTable : params => dispatch(loadEditor(params)),
  editTemplate    : params => dispatch(editTemplate(params)),
  editRow         : row => dispatch(editRow(row)),
  deleteRow       : row => dispatch(deleteRow(row)),
  clearEditFlag   : () => dispatch(clearEditFlag()),
  addField        : field => dispatch(addField(field)),
});

export default connect(mapStateToProps, mapDisptachToProps)(Editor);
