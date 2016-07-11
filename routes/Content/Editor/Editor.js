import React, { Component } from "react";
import { connect } from "react-redux";
import { Sidebar, EG } from "components";
import { EditorMenu } from "./EditorMenu";
import { TitleBar } from "./TitleBar";
import { loadEditor, editTemplate } from "../../../dataflow/editor/actions";
import { toggleMenuSidebar, clearMenuState } from "../../../dataflow/menu/actions";
import styles from "./Editor.less";

class Editor extends Component {
  constructor(props) {
    super(props);
    this.editTemplateHandler = this.editTemplateHandler.bind(this);
    this.colSpec = {
      "action"         : {
        "headerStyle" : { borderLeft : 0 },
        "displayText" : "",
        "renderType"  : "action",
        "actions"     : {},
        "sortable"    : false,
        "insertable"  : false
      },
      "fieldName"      : {
        "fieldKey" : "fieldName",
        "displayText" : "Field Name",
        "renderType"  : "text"
      },
      "fieldReference" : {
        "fieldKey" : ["tableName", "colName"],
        "colStyle"       : { fontSize : 12 },
        "displayText"    : "Reference to field",
        "renderType"     : "reference",
        "refTableSource" : [
          { "id" : 0, "label" : "XXX" },
          { "id" : 1, "label" : "YYY" },
          { "id" : 2, "label" : "ZZZ" }
        ],
        "refFieldSource" : [
          { "id" : 0, "label" : "aInXXX" },
          { "id" : 1, "label" : "bInXXX" },
          { "id" : 2, "label" : "cInXXX" }
        ]
      },
      "fieldType"      : {
        "fieldKey" : "fieldType",
        "displayText" : "Field Type",
        "renderType"  : "list",
        "source"      : [
          { "id" : 0, "label" : "Text" },
          { "id" : 1, "label" : "Decimal" },
          { "id" : 2, "label" : "Date" },
          { "id" : 3, "label" : "Time" },
          { "id" : 4, "label" : "ListMenu" }
        ]
      },
      "fieldValue"     : {
        "fieldKey" : "fieldValue",
        "displayText" : "Field Value",
        "renderType"  : "date"
      },
    };
    this.colWidths = {
      action         : 45,
      fieldName      : 130,
      fieldReference : 170,
      fieldType      : 120,
      fieldValue     : 150,
    };
  }

  componentWillMount() {
    this.props.clearMenuState();
    this.props.loadEditorTable(this.props.params);
  }

  editTemplateHandler(values) {
    this.props.editTemplate({
      id : this.props.editor.data._id,
      ...values,
    });
  }

  render() {
    const { editor, contextMenu, toggleSidebar } = this.props;

    return (
      <div>

        {/* Title Menu */}
        <TitleBar
          className={styles.titleBar}
          title={editor.data.templateName}
          meta={{createdAt : editor.data.createdAt, favorite : editor.data.favorite}}
          editTemplate={this.editTemplateHandler}
        />

        {/* Contextual Menu */}
        <EditorMenu
          className={styles.editorMenu}
          toggleSidebar={toggleSidebar}
          store={contextMenu}
        />

        <div>
          {/* Sidebar Container */}
          {
            contextMenu.showSidebar &&
            <Sidebar
              className={styles.sidebar}
            />
          }

          {/* DataGrid Container */}
          <EG
            className={styles.entrygrid}
            style={{ left: !contextMenu.showSidebar && 0 }}
            colSpec={this.colSpec}
            colWidths={this.colWidths}
            data={editor.data.fields}
            isLoading={editor.isLoading}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  editor      : state.editor,
  contextMenu : state.menu,
});

const mapDisptachToProps = dispatch => ({
  toggleSidebar   : () => dispatch(toggleMenuSidebar()),
  loadEditorTable : (params) => dispatch(loadEditor(params)),
  clearMenuState  : () => dispatch(clearMenuState()),
  editTemplate    : (params) => dispatch(editTemplate(params)),
});

export default connect(mapStateToProps, mapDisptachToProps)(Editor);
