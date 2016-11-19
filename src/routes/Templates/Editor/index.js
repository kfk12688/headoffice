import React, { Component } from "react";
import { StickyContainer, Sticky } from "react-sticky";
import { connect } from "react-redux";
import { SpecDefiner, Button, Modal, FavoriteCell } from "components";
import { getTemplate, updateSchema, addField } from "dataflow/templates/actions";
import EditTemplateForm from "../../Forms/NewTemplateForm";
import styles from "./index.less";

class Editor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal : false,
    };
    this.updateSchema = this.updateSchema.bind(this);

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
      fieldProps  : 300,
    };
  }

  componentWillMount() {
    const { collectionName } = this.props.params;
    this.props.getTemplate(collectionName);
  }

  updateSchema(e) {
    e.preventDefault();
    const { collectionName } = this.props.params;
    const { userSchema } = this.props.editor[collectionName];
    this.props.updateSchema(collectionName, userSchema);
  }

  render() {
    const { collectionName } = this.props.params;
    const { userSchema, isLoading, templateName = "" } = this.props.editor[collectionName] || {};

    return (
      <div className="row">
        <div className="col-md-10 offset-md-1">
          <StickyContainer>
            <div style={{ marginTop : "1rem" }} className="row">
              <SpecDefiner
                className={"col-md-9"}
                colSpec={this.colSpec}
                colWidths={this.colWidths}
                name={templateName}
                data={userSchema}
                isLoading={isLoading}
                onSubmit={field => this.props.addField(collectionName, field)}
              />

              <div className={"col-md-3"}>
                <Sticky stickyStyle={{ paddingTop : 8 }}>
                  <div className="btn-group-vertical btn-block">
                    <Button onClick={this.saveUserSchema}>Update Schema</Button>
                    <Button>Undo</Button>
                    <Button>Redo</Button>
                    <Button onClick={this.loadSchema}>Reset Schema</Button>
                  </div>

                  <div className={styles.divider}/>
                  <Modal
                    modalTitle="Edit Template"
                    faName="edit"
                    caption="Edit Template"
                    show={this.state.showModal}
                    showModal={e => this.setState({ showModal : true })}
                    hideModal={e => this.setState({ showModal : false })}
                    block
                  >
                    <EditTemplateForm
                      state={{}} submitForm={() => {}}
                      toggleModal={e => this.setState({ showModal : false })}
                    />
                  </Modal>
                  <Button faName="times" block>Delete Template</Button>
                  <Button block>Make Favorite <FavoriteCell value inheritSize/></Button>

                  <div className={styles.divider}/>
                  <div>Created By :</div>
                  <div>Created At :</div>
                  <div>Last Modified :</div>
                  <div>Belongs to :</div>
                </Sticky>
              </div>
            </div>
          </StickyContainer>
        </div>
      </div>
    );
  }
}

Editor.propTypes = {
  // route
  params       : React.PropTypes.object,
  // state
  editor       : React.PropTypes.object.isRequired,
  // actions
  getTemplate  : React.PropTypes.func.isRequired,
  addField     : React.PropTypes.func.isRequired,
  updateSchema : React.PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  editor : state.templates,
});

const mapDisptachToProps = dispatch => ({
  getTemplate  : collectionName => dispatch(getTemplate(collectionName)),
  addField     : (collectionName, field) => dispatch(addField(collectionName, field)),
  updateSchema : (collectionName, schema) => dispatch(updateSchema(collectionName, schema)),
});

export default connect(mapStateToProps, mapDisptachToProps)(Editor);
