import React, { Component } from "react";
import { connect } from "react-redux";
import { SpecDefiner, Button, StickySidebar, Modal, FavoriteCell } from "components";
import {
  loadEditor, editTemplate, editRow, deleteRow, clearEditFlag, addField, editTemplateSchema,
} from "dataflow/template/editor/actions";
import EditTemplateForm from "../NewTemplateForm";
import { TitleBar } from "./TitleBar";
import cx from "classnames";
import styles from "./index.less";

class Editor extends Component {
  constructor(props) {
    super(props);
    this.addField = this.addField.bind(this);
    this.loadSchema = this.loadSchema.bind(this);
    this.saveUserSchema = this.saveUserSchema.bind(this);
    this.saveTemplateMeta = this.saveTemplateMeta.bind(this);
    this.state = { showModal : false };
    this.toggleModal = this.toggleModal.bind(this);

    this.colSpec = {
      "action"      : {
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
      "displayText" : {
        "displayText" : "Field Name",
        "renderType"  : "text",
      },
      "fieldType"   : {
        "displayText" : "Field Type",
        "renderType"  : "text",
      },
      "fieldProps"  : {
        "displayText" : "Field Properties",
        "renderType"  : "label",
      },
    };
    this.colWidths = {
      action      : 45,
      displayText : 200,
      fieldType   : 140,
      fieldProps  : 400,
    };
  }

  componentWillMount() {
    this.loadSchema();
  }

  loadSchema() {
    this.props.loadEditorTable(this.props.params);
  }

  // Adds data to the redux data model
  addField(field) {
    this.props.addField(field);
  }

  // Persists data to the server
  saveUserSchema() {
    const { userSchema, id, templateName } = this.props.editor;
    this.props.editTemplateSchema({
      userSchema,
      id,
      templateName,
    });
  }

  saveTemplateMeta(data) {
    console.log(data);
  }

  toggleModal() {
    if (this.state.showModal) {
      this.setState({ showModal : false });
    } else {
      this.setState({ showModal : true });
    }
  }

  render() {
    const { editor, store } = this.props;

    return (
      <div className="row">
        <div className="col-md-10 offset-md-1">
          <TitleBar
            store={editor}
            editTemplate={this.saveTemplateMeta}
          />

          <div className="row">
            <div className={cx("col-md-12", styles.divider)}></div>
          </div>

          <div className="row">
            <SpecDefiner
              className={"col-md-9"}
              colSpec={this.colSpec}
              colWidths={this.colWidths}
              data={editor.userSchema}
              isLoading={editor.isLoading}
              onSubmit={this.addField}
            />
            <div className={"col-md-3"}>
              <StickySidebar top={171}>
                <div className="row">
                  <div className={"col-md-12 btn-group-vertical"}>
                    <Button onClick={this.saveUserSchema}>Update Schema</Button>
                    <Button>Undo</Button>
                    <Button>Redo</Button>
                    <Button onClick={this.loadSchema}>Reset Schema</Button>
                  </div>
                </div>

                <div className={styles.divider}/>

                <div className="row">
                  <div className="col-md-12">
                    <Modal
                      modalTitle="Edit Template"
                      faName="edit"
                      caption="Edit Template"
                      show={this.state.showModal}
                      showModal={e => this.setState({ showModal : true })}
                      hideModal={e => this.setState({ showModal : false })}
                      block
                    >
                      <EditTemplateForm state={store} submitForm={editTemplate} toggleModal={this.toggleModal}/>
                    </Modal>
                    <Button faName="times" block>Delete Template</Button>
                    <Button block>Make Favorite <FavoriteCell value inheritSize/></Button>
                  </div>
                </div>

                <div className={styles.divider}/>

                <div className="row">
                  <div className="col-md-12">
                    <div>Created By :</div>
                    <div>Created At :</div>
                    <div>Last Modified :</div>
                    <div>Belongs to :</div>
                  </div>
                </div>
              </StickySidebar>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Editor.propTypes = {
  // route
  params             : React.PropTypes.object,
  // state
  editor             : React.PropTypes.object.isRequired,
  // actions
  loadEditorTable    : React.PropTypes.func.isRequired,
  editTemplate       : React.PropTypes.func,
  editTemplateSchema : React.PropTypes.func.isRequired,
  editRow            : React.PropTypes.func.isRequired,
  deleteRow          : React.PropTypes.func.isRequired,
  addField           : React.PropTypes.func.isRequired,
  store              : React.PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  editor : state.template.editor,
});

const mapDisptachToProps = dispatch => ({
  loadEditorTable    : params => dispatch(loadEditor(params)),
  editTemplateSchema : params => dispatch(editTemplateSchema(params)),
  editRow            : row => dispatch(editRow(row)),
  deleteRow          : row => dispatch(deleteRow(row)),
  clearEditFlag      : () => dispatch(clearEditFlag()),
  addField           : field => dispatch(addField(field)),
});

export default connect(mapStateToProps, mapDisptachToProps)(Editor);
