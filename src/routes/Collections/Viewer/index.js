import React, { Component } from "react";
import { connect } from "react-redux";
import { getProps, toDate, isDefined } from "utils";
import { StickyContainer, Sticky, Link, PaginationGrid, FavoriteIcon, Button, Modal } from "components";
import { getCollection, getItems, deleteItem, deleteCollection, updateCollection, starCollection } from "dataflow/collections/actions";
import { EditTemplateForm } from "forms";
import styles from "./index.less";

const getContentValues = getProps(["items", "userSchema", "isLoading", "itemCount", "templateName"]);
const getMetaValues    = getProps(["modifiedAt", "createdAt", "isFavorite", "workbook.workbookName", "createdBy.name"]);

class Viewer extends Component {
  constructor() {
    super();
    this.state = {
      page      : 1,
      limit     : 30,
      showModal : false,
    };

    this.getItems         = this.getItems.bind(this);
    this.setPage          = this.setPage.bind(this);
    this.setLimit         = this.setLimit.bind(this);
    this.deleteCollection = this.deleteCollection.bind(this);
    this.updateCollection = this.updateCollection.bind(this);
    this.starCollection   = this.starCollection.bind(this);
  }

  componentWillMount() {
    const { collectionName } = this.props.params;
    this.props.getCollection(collectionName);
  }

  setPage(pageIdx) {
    let newIdx            = pageIdx;
    const { limit, page } = this.state;

    if (typeof pageIdx === "string") {
      if (pageIdx === "prev") {
        newIdx = page - 1;
      }
      if (pageIdx === "next") {
        newIdx = page + 1;
      }
    }
    this.setState({
      page : newIdx,
      limit,
    });
    this.getItems(newIdx, limit);
  }

  setLimit(limit) {
    const { page } = this.state;
    this.setState({
      page,
      limit,
    });
    this.getItems(page, limit);
  }

  getItems(page, limit) {
    const { collectionName } = this.props.params;
    this.props.getItems(collectionName, { page, limit });
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

  renderContent() {
    const collectionName = this.props.params.collectionName;
    const contentValues  = getContentValues(this.props.collections[collectionName]);
    const templateName   = contentValues.isLoading ?
                           "Loading ..." :
                           contentValues.templateName;
    const itemCount      = contentValues.isLoading ?
                           "(loading...)" :
                           `(${contentValues.itemCount} Entries)`;

    return (
      <div className="col-md-9">
        <Sticky stickyStyle={{ backgroundColor : "white", zIndex : 100 }}>
          <h4>{templateName}&nbsp;
            <small className="text-muted">{itemCount}</small>
          </h4>
        </Sticky>

        <div className="row">
          <div className="col-md-12">
            {
              isDefined(contentValues.userSchema) ?
              <PaginationGrid topOffset={96}
                              name={collectionName}
                              spec={contentValues.userSchema || []}
                              data={contentValues.items || {}}
                              isLoading={contentValues.isLoading}
                              deleteItem={id => this.props.deleteItem(collectionName, id)}
                              editItem={id => this.context.router.push(`/collections/edit/${collectionName}/${id}`)}
              /> :
              <div>
                <div>No field definition is given for the template</div>
                <div>Click <Link to={`/templates/new/${collectionName}`}>here</Link> to create them</div>
              </div>
            }
          </div>
        </div>
      </div>
    );
  }

  render() {
    const collectionName = this.props.params.collectionName;
    const metaValues     = getMetaValues(this.props.collections[collectionName]);

    return (
      <div className="row">
        <div className="col-md-10 offset-md-1">
          <StickyContainer>
            <div className="row" style={{ marginTop : "1rem" }}>
              {this.renderContent()}
              <div className="col-md-3">
                <Sticky stickyStyle={{ paddingTop : 8 }}>
                  <div className="btn-group-vertical btn-block">
                    <Link to={`templates/view/${collectionName}`} className="btn btn-secondary btn-sm" role="button">
                      Edit Schema&nbsp;<i className="fa fa-edit"/>
                    </Link>
                    <Link to="collections" className="btn btn-secondary btn-sm" role="button">
                      Close View&nbsp;<i className="fa fa-times-circle-o"/>
                    </Link>
                    <Link to={`collections/new/${collectionName}`} className="btn btn-secondary btn-sm" role="button">
                      Enter new data&nbsp;<i className="fa fa-arrow-circle-o-right"/>
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
                    <FavoriteIcon value={metaValues.isFavorite || false} inheritSize/>
                  </Button>

                  <div className={styles.divider}/>
                  <div className={styles.attributes}>
                    <div>Created By : <span>{metaValues.createdBy}</span></div>
                    <div>Created At : <span>{toDate("DD-MM-YYYY", metaValues.createdAt)}</span></div>
                    <div>Last Modified : <span>{toDate(null, metaValues.modifiedAt)}</span></div>
                    <div>Belongs to : <span>{metaValues.workbook}</span></div>
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

Viewer.propTypes         = {
  // route
  params           : React.PropTypes.object.isRequired,
  // state
  collections      : React.PropTypes.object.isRequired,
  // actions
  getCollection    : React.PropTypes.func.isRequired,
  getItems         : React.PropTypes.func.isRequired,
  updateCollection : React.PropTypes.func.isRequired,
  starCollection   : React.PropTypes.func.isRequired,
  deleteCollection : React.PropTypes.func.isRequired,
  // Item Actions
  deleteItem       : React.PropTypes.func.isRequired,
};
Viewer.contextTypes      = {
  router : React.PropTypes.object,
};
const mapStateToProps    = state => ({
  collections : state.collections,
});
const mapDisptachToProps = dispatch => ({
  // Collection Actions
  getCollection    : (collectionName) => dispatch(getCollection(collectionName)),
  getItems         : (collectionName, query) => dispatch(getItems(collectionName, query)),
  updateCollection : (collectionName, data) => dispatch(updateCollection(collectionName, data)),
  starCollection   : collectionName => dispatch(starCollection(collectionName)),
  deleteCollection : collectionName => dispatch(deleteCollection(collectionName)),
  // Item Actions
  deleteItem       : (collectionName, id) => dispatch(deleteItem(collectionName, id)),
});

export default connect(mapStateToProps, mapDisptachToProps)(Viewer);
