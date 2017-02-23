import React, { Component } from "react";
import { connect } from "react-redux";
import { getProps, toDate, isDefined } from "utils";
import { StickyContainer, Sticky, Link, Button, Modal, FavoriteIcon } from "components";
import { EditTemplateForm, CollectionEntryForm } from "forms";
import { getSchema, addItem, deleteCollection, starCollection, updateCollection } from "dataflow/collections/actions";
import styles from "./index.less";

const getContentValues = getProps(["userSchema", "isLoading", "templateName", "workbook.workbookName", "modifiedAt", "createdAt", "createdBy.name", "isFavorite"]);

class Creator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page      : 1,
      limit     : 30,
      showModal : false,
    };

    this.addItem          = this.addItem.bind(this);
    this.deleteCollection = this.deleteCollection.bind(this);
    this.updateCollection = this.updateCollection.bind(this);
    this.starCollection   = this.starCollection.bind(this);
  }

  componentWillMount() {
    const { collectionName } = this.props.params;
    this.props.getSchema(collectionName);
  }

  addItem(rowData) {
    const { collectionName } = this.props.params;
    this.props.addItem(collectionName, rowData);
  }

  deleteCollection(e) {
    e.preventDefault();
    const confirmationFlag = window.confirm("Are you sure you want to delete this template?");
    if (confirmationFlag) {
      const { collectionName } = this.props.params;
      this.props.deleteCollection(collectionName).then(this.context.router.push("/templates"));
    }
  }

  starCollection(e) {
    e.preventDefault();
    const { collectionName } = this.props.params;
    this.props.starCollection(collectionName);
  }

  updateCollection(data) {
    const { collectionName } = this.props.params;
    this.props.updateCollection(collectionName, data);
  }

  render() {
    const { collectionName } = this.props.params;
    const contentValues      = getContentValues(this.props.collections[collectionName]);
    const templateName       = contentValues.isLoading ?
                               "Loading ..." :
                               contentValues.templateName;

    return (
      <div className="row">
        <div className="col-md-10 offset-md-1">
          <StickyContainer>
            <div className="row" style={{ marginTop : "1rem" }}>
              <div className="col-md-9">
                <Sticky stickyStyle={{ backgroundColor : "white", zIndex : 100 }}>
                  <h4 style={{ paddingTop : "8px", paddingBottom : "8px" }}>
                    {templateName}
                    <Link className="pull-right" to={`/collections/view/${collectionName}`}>
                      <Button style="primary" faName="arrow-left">Go Back</Button>
                    </Link>
                  </h4>
                </Sticky>

                <div className="row">
                  <div className="col-md-12">
                    {
                      isDefined(contentValues.userSchema) ?
                      <CollectionEntryForm spec={contentValues.userSchema || []}
                                           onSubmit={this.addItem}
                      /> :
                      <div>
                        <div>No field definition is given for the template</div>
                        <div>Click <Link to={`/templates/new/${collectionName}`}>here</Link> to create them</div>
                      </div>
                    }
                  </div>
                </div>
              </div>

              <div className="col-md-3">
                <Sticky stickyStyle={{ paddingTop : 8 }}>
                  <div className="btn-group-vertical btn-block">
                    <Link to={`templates/view/${collectionName}`} className="btn btn-secondary btn-sm" role="button">
                      Edit Schema&nbsp;<i className="fa fa-edit"/>
                    </Link>
                    <Link to="collections" className="btn btn-secondary btn-sm" role="button">
                      Close View&nbsp;<i className="fa fa-times-circle-o"/>
                    </Link>
                    <Link to={`collections/view/${collectionName}`} className="btn btn-secondary btn-sm" role="button">
                      View entered data&nbsp;<i className="fa fa-arrow-circle-o-right"/>
                    </Link>
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
                    <EditTemplateForm onSubmit={this.updateCollection}
                                      toggleModal={e => this.setState({ showModal : false })}
                    />
                  </Modal>
                  <Button faName="times" block onClick={this.deleteCollection}>Delete Template</Button>
                  <Button block onClick={this.starCollection}>
                    Make Favorite
                    &nbsp;
                    <FavoriteIcon value={contentValues.isFavorite || false} inheritSize/>
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

Creator.propTypes        = {
  // route
  params           : React.PropTypes.object.isRequired,
  // state
  collections      : React.PropTypes.object.isRequired,
  // Collection Actions
  getSchema        : React.PropTypes.func.isRequired,
  updateCollection : React.PropTypes.func.isRequired,
  deleteCollection : React.PropTypes.func.isRequired,
  starCollection   : React.PropTypes.func.isRequired,
  // Item Actions
  addItem          : React.PropTypes.func.isRequired,
};
const mapStateToProps    = state => ({
  collections : state.collections,
});
const mapDisptachToProps = dispatch => ({
  // Collection Actions
  getSchema        : (collectionName) => dispatch(getSchema(collectionName)),
  updateCollection : (collectionName, data) => dispatch(updateCollection(collectionName, data)),
  deleteCollection : collectionName => dispatch(deleteCollection(collectionName)),
  starCollection   : collectionName => dispatch(starCollection(collectionName)),
  // Item Actions
  addItem          : (collectionName, data) => dispatch(addItem(collectionName, data)),
});

export default connect(mapStateToProps, mapDisptachToProps)(Creator);
