import React, { Component } from "react";
import { connect } from "react-redux";
import { SpecDefiner, Button } from "components";
import { TitleBar } from "./TitleBar";
import {
  loadEditor, editTemplate, editRow, deleteRow, clearEditFlag, addField, editTemplateSchema
} from "../../../dataflow/content/editor/actions";
import styles from "./Editor.less";

class Editor extends Component {
  constructor(props) {
    super(props);
    this.addField = this.addField.bind(this);
    this.saveUserSchema = this.saveUserSchema.bind(this);
    this.saveTemplateMeta = this.saveTemplateMeta.bind(this);

    this.colSpec = {
      "action"     : {
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
      "fieldName"  : {
        "displayText" : "Field Name",
        "renderType"  : "text",
      },
      "fieldType"  : {
        "displayText" : "Field Type",
        "renderType"  : "text",
      },
      "fieldProps" : {
        "displayText" : "Field Properties",
        "renderType"  : "label",
      },
    };
    this.colWidths = {
      action     : 45,
      fieldName  : 130,
      fieldType  : 120,
      fieldProps : 450,
    };
  }

  componentWillMount() {
    this.props.loadEditorTable(this.props.params);
  }

  // Adds data to the redux data model
  addField(field) {
    this.props.addField(field);
  }

  // Persists data to the server
  saveUserSchema() {
    const { userSchema, id, templateName } = this.props.editor;
    console.log({
      userSchema,
      id : id,
    });
    // this.props.editTemplateSchema({
    //   userSchema,
    //   id : id,
    //   templateName,
    // });
  }

  saveTemplateMeta(data) {
    console.log(data);
  }

  render() {
    const { editor } = this.props;

    return (
      <div>

        {/* Title Menu */}
        <TitleBar
          className={styles.titleBar}
          store={editor}
          editTemplate={this.saveTemplateMeta}
        />

        <div>
          {/* DataGrid Container */}
          <SpecDefiner
            className={styles.entrygrid}
            colSpec={this.colSpec}
            colWidths={this.colWidths}
            data={editor.userSchema}
            isLoading={editor.isLoading}
            onSubmit={this.addField}
          />

          {/* Sidebar Container */}
          <div className={styles.sidebar}>
            <Button accent="green" className={styles.sidebarButton} onClick={this.saveUserSchema}>Save</Button>
            <Button accent="green" disabled className={styles.sidebarButton}>Undo</Button>
            <Button accent="green" disabled className={styles.sidebarButton}>Redo</Button>
            <Button accent="green" className={styles.sidebarButton}>Cancel</Button>
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
  addField        : React.PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  editor : state.content.editor,
});

const mapDisptachToProps = dispatch => ({
  loadEditorTable    : params => dispatch(loadEditor(params)),
  editTemplate       : params => dispatch(editTemplate(params)),
  editTemplateSchema : params => dispatch(editTemplateSchema(params)),
  editRow            : row => dispatch(editRow(row)),
  deleteRow          : row => dispatch(deleteRow(row)),
  clearEditFlag      : () => dispatch(clearEditFlag()),
  addField           : field => dispatch(addField(field)),
});

export default connect(mapStateToProps, mapDisptachToProps)(Editor);
