import React, { Component } from "react";
import { connect } from "react-redux";
import { EditorMenu, Sidebar, EG } from "components";
import { loadEditor } from "../../../dataflow/editor/actions";
import { toggleMenuSidebar, clearMenuState } from "../../../dataflow/menu/actions";
import styles from "./Editor.less";

class Editor extends Component {
  constructor(props) {
    super(props);
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
        "displayText" : "Field Name",
        "renderType"  : "text"
      },
      "fieldReference" : {
        "colStyle"       : { fontSize : 12 },
        "displayText"    : "Reference to field",
        "renderType"     : "reference",
        "refTableSource" : [
          { "key" : 0, "val" : "XXX" },
          { "key" : 1, "val" : "YYY" },
          { "key" : 2, "val" : "ZZZ" }
        ],
        "refFieldSource" : [
          { "key" : 0, "val" : "aInXXX" },
          { "key" : 1, "val" : "bInXXX" },
          { "key" : 2, "val" : "cInXXX" }
        ]
      },
      "fieldType"      : {
        "displayText" : "Field Type",
        "renderType"  : "list",
        "source"      : [
          { "key" : 0, "val" : "Text" },
          { "key" : 1, "val" : "Decimal" },
          { "key" : 2, "val" : "Date" },
          { "key" : 3, "val" : "Time" },
          { "key" : 4, "val" : "ListMenu" }
        ]
      },
      "fieldValue"     : {
        "displayText" : "Field Value",
        "renderType"  : "text"
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

  render() {
    const { editor, contextMenu, toggleSidebar } = this.props;

    return (
      <div>

        {/* Title Menu */}

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
});

export default connect(mapStateToProps, mapDisptachToProps)(Editor);
