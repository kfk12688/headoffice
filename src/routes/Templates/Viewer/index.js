import React, { Component } from "react";
import { StickyContainer, Sticky } from "react-sticky";
import { connect } from "react-redux";
import { execById, getProps, toDate, length } from "utils";
import { SDTable, Button, Modal, FavoriteIcon, Link } from "components";
import { EditTemplateForm } from "forms";
import { getTemplate, deleteTemplate, starTemplate, updateTemplate, deleteSchema } from "dataflow/templates/actions";
import styles from "./index.less";

const getContentValues = getProps(["userSchema", "isLoading", "templateName", "workbook.workbookName", "modifiedAt", "createdAt", "createdBy.name", "isFavorite"]);

class Editor extends Component {
  constructor(props) {
    super(props);
    this.state               = {
      showModal : false,
    };
    const { collectionName } = props.params;
    this.deleteTemplate      = this.deleteTemplate.bind(this);
    this.updateTemplate      = this.updateTemplate.bind(this);
    this.starTemplate        = this.starTemplate.bind(this);
    this.actions             = {
      editField   : {
        name    : "Edit",
        handler : (id) => this.context.router.push(`/templates/edit/${collectionName}/${id}`),
      },
      deleteField : {
        name    : "Delete",
        handler : execById(props.deleteSchema, collectionName),
      },
    };

    this.colSpec   = {
      "action"     : {
        "headerStyle" : { borderLeft : 0 },
        "displayText" : "",
        "renderType"  : "action",
        "actions"     : this.actions,
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
      fieldName  : 200,
      fieldType  : 140,
      fieldProps : 300,
    };
  }

  componentWillMount() {
    const { collectionName } = this.props.params;
    this.props.getTemplate(collectionName);
  }

  deleteTemplate(e) {
    e.preventDefault();
    const confirmed = window.confirm("Are you sure you want to delete this template?");
    if (confirmed) {
      const { collectionName } = this.props.params;
      this.props.deleteTemplate(collectionName).then(this.context.router.push("/templates"));
    }
  }

  starTemplate(e) {
    e.preventDefault();
    const { collectionName } = this.props.params;
    this.props.starTemplate(collectionName);
  }

  updateTemplate(data) {
    const { collectionName } = this.props.params;
    this.props.updateTemplate(collectionName, data);
  }

  render() {
    const { collectionName } = this.props.params;
    const contentValues      = getContentValues(this.props.editor[collectionName]);
    const noFields           = contentValues.isLoading ?
                               "Loading..." :
                               `(${length(contentValues.userSchema)} Fields)`;

    return (
      <div className="row">
        <div className="col-md-10 offset-md-1">
          <StickyContainer>
            <div style={{ marginTop : "1rem" }} className="row">
              <div className="col-md-9">
                <Sticky stickyStyle={{ zIndex : 1040, backgroundColor : "white" }}>
                  <h4 style={{ paddingTop : "8px", paddingBottom : "8px" }}>
                    {contentValues.templateName}
                    &nbsp;
                    <small className="text-muted">{noFields}</small>
                    <Link className="pull-right" to={`/templates/new/${collectionName}`}>
                      <Button faName="plus" style="primary">Add new Schema</Button>
                    </Link>
                  </h4>
                </Sticky>

                <SDTable colSpec={this.colSpec}
                         colWidths={this.colWidths}
                         data={contentValues.userSchema || []}
                         isLoading={contentValues.isLoading || false}
                />
              </div>

              <div className="col-md-3">
                <Sticky stickyStyle={{ paddingTop : 8 }}>
                  <div className="btn-group-vertical btn-block">
                    <Button>Undo</Button>
                    <Button>Redo</Button>
                    <Button onClick={e => this.props.getTemplate(collectionName)}>Reset Schema</Button>
                  </div>

                  <div className={styles.divider}/>

                  <div className="btn-group-vertical btn-block">
                    <Link to={`/collections/new/${collectionName}`}
                          className="btn btn-secondary btn-sm"
                          role="button"
                    >
                      Enter Data&nbsp;<i className="fa fa-times-circle-o"/>
                    </Link>
                    <Link to={`/collections/view/${collectionName}`}
                          className="btn btn-secondary btn-sm"
                          role="button"
                    >
                      View entered data&nbsp;<i className="fa fa-arrow-circle-o-right"/>
                    </Link>
                  </div>

                  <div className={styles.divider}/>
                  <Modal
                    faName="edit"
                    caption="Edit Template"
                    show={this.state.showModal}
                    showModal={e => this.setState({ showModal : true })}
                    hideModal={e => this.setState({ showModal : false })}
                    block
                  >
                    <EditTemplateForm onSubmit={this.updateTemplate}
                                      toggleModal={e => this.setState({ showModal : false })}
                    />
                  </Modal>
                  <Button faName="times" block onClick={this.deleteTemplate}>Delete Template</Button>
                  <Button block onClick={this.starTemplate}>
                    Make Favorite <FavoriteIcon value={contentValues.isFavorite || false} inheritSize/>
                  </Button>

                  <div className={styles.divider}/>
                  <div className={styles.attributes}>
                    <div>Created By : <span>{contentValues.createdBy}</span></div>
                    <div>Created At : <span>{toDate("DD-MM-YYYY", contentValues.createdAt)}</span></div>
                    <div>Last Modified : <span>{toDate(null, contentValues.modifiedAt)}</span></div>
                    <div>Belongs to : <span>{contentValues.workbook}</span></div>
                  </div>
                </Sticky>
              </div>
            </div>
          </StickyContainer>
        </div>
      </div>
    );
  }
}

Editor.propTypes         = {
  // route
  params         : React.PropTypes.object,
  // state
  editor         : React.PropTypes.object.isRequired,
  // actions
  getTemplate    : React.PropTypes.func.isRequired,
  deleteTemplate : React.PropTypes.func.isRequired,
  starTemplate   : React.PropTypes.func.isRequired,
  updateTemplate : React.PropTypes.func.isRequired,
  // schema actions
  deleteSchema   : React.PropTypes.func.isRequired,
};
Editor.contextTypes      = {
  router : React.PropTypes.object,
};
const mapStateToProps    = state => ({
  editor : state.templates,
});
const mapDisptachToProps = dispatch => ({
  getTemplate    : collectionName => dispatch(getTemplate(collectionName)),
  deleteTemplate : collectionName => dispatch(deleteTemplate(collectionName)),
  starTemplate   : collectionName => dispatch(starTemplate(collectionName)),
  updateTemplate : (collectionName, data) => dispatch(updateTemplate(collectionName, data)),
  // schema actions
  deleteSchema   : (collectionName, id) => dispatch(deleteSchema(collectionName, id)),
});

export default connect(mapStateToProps, mapDisptachToProps)(Editor);
