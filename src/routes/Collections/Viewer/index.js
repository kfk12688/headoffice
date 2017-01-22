import React, { Component } from "react";
import { connect } from "react-redux";
import { StickyContainer, Sticky } from "react-sticky";
import { Link } from "react-router";
import { getProps, toDate } from "utils";
import { PaginationGrid, PaginationLinks, FavoriteIcon, Button, Modal } from "components";
import {
  loadSpec, loadData, deleteRow, updateRow, deleteTemplate, updateTemplate, starCollection
} from "dataflow/collections/actions";
import { EditTemplateForm } from "forms";
import styles from "./index.less";

const getMetaValues = getProps(["modifiedAt", "createdAt", "isFavorite", "workbook.name", "createdBy.name"]);

class Viewer extends Component {
  constructor() {
    super();
    this.state = {
      page      : 1,
      limit     : 30,
      showModal : false,
    };

    this.loadData       = this.loadData.bind(this);
    this.setPage        = this.setPage.bind(this);
    this.setLimit       = this.setLimit.bind(this);
    this.deleteTemplate = this.deleteTemplate.bind(this);
    this.updateTemplate = this.updateTemplate.bind(this);
    this.starCollection = this.starCollection.bind(this);
  }

  componentWillMount() {
    const { collectionName } = this.props.params;
    const { page, limit }    = this.state;

    this.props.loadSpec(collectionName)
      .then(() => this.props.loadData(collectionName, { page, limit }));
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
    this.loadData(newIdx, limit);
  }

  setLimit(limit) {
    const { page } = this.state;
    this.setState({
      page,
      limit,
    });
    this.loadData(page, limit);
  }

  loadData(page, limit) {
    const { collectionName } = this.props.params;
    this.props.loadData(collectionName, { page, limit });
  }

  deleteTemplate(e) {
    e.preventDefault();
    const confirmationFlag = window.confirm("Are you sure you want to delete this template?");
    if (confirmationFlag) {
      const { collectionName } = this.props.params;
      this.props.deleteTemplate(collectionName).then(this.context.router.push("/templates"));
    }
  }

  starCollection(e) {
    e.preventDefault();
    const { collectionName } = this.props.params;
    this.props.starCollection(collectionName);
  }

  updateTemplate(data) {
    const { collectionName } = this.props.params;
    this.props.updateTemplate(collectionName, data);
  }

  renderContent() {
    const collectionName   = this.props.params.collectionName;
    const getContentValues = getProps([`data.${this.state.page}`, "userSchema", "isLoading", "count", "templateName"]);
    const contentValues    = getContentValues(this.props.viewStore[collectionName]);

    return (
      <div className="col-md-9">
        <Sticky stickyStyle={{ backgroundColor : "white", zIndex : 100 }}>
          <div className="row">
            <div className="col-md-12">
              <h4>{contentValues.templateName}&nbsp;
                <small className="text-muted">({contentValues.count || 0} Entries)</small>
              </h4>
            </div>
          </div>

          <div className="row">
            <PaginationLinks className="col-md-12"
                             setLimit={this.setLimit}
                             setPage={this.setPage}
                             activePage={this.state.page}
                             limit={this.state.limit}
            />
          </div>
        </Sticky>

        <div className="row">
          <div className="col-md-12">
            <PaginationGrid topOffset={114}
                            spec={contentValues.userSchema || []}
                            data={contentValues.data || {}}
                            isLoading={contentValues.isLoading}
            />
          </div>
        </div>
      </div>
    );
  }

  render() {
    const collectionName = this.props.params.collectionName;
    const metaValues     = getMetaValues(this.props.viewStore[collectionName]);

    return (
      <div className="row">
        <div className="col-md-10 offset-md-1">
          <StickyContainer>
            <div className="row" style={{ marginTop : "1rem" }}>
              {this.renderContent()}
              <div className="col-md-3">
                <Sticky stickyStyle={{ paddingTop : 8 }}>
                  <div className="btn-group-vertical btn-block">
                    <Link to={`templates/${collectionName}`} className="btn btn-secondary btn-sm" role="button">
                      Edit Schema&nbsp;<i className="fa fa-edit"/>
                    </Link>
                    <Link to="collections" className="btn btn-secondary btn-sm" role="button">
                      Close View&nbsp;<i className="fa fa-times-circle-o"/>
                    </Link>
                    <Link to={`collections/entry/${collectionName}`} className="btn btn-secondary btn-sm" role="button">
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
                    <EditTemplateForm
                      state={{}} submitForm={() => {}}
                      toggleModal={e => this.setState({ showModal : false })}
                    />
                  </Modal>
                  <Button faName="times" block onClick={this.deleteTemplate}>Delete Template</Button>
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
  params         : React.PropTypes.object,
  // state
  viewStore      : React.PropTypes.object.isRequired,
  // actions
  loadSpec       : React.PropTypes.func,
  loadData       : React.PropTypes.func,
  deleteTemplate : React.PropTypes.func.isRequired,
  starCollection : React.PropTypes.func.isRequired,
  updateTemplate : React.PropTypes.func.isRequired,
};
const mapStateToProps    = state => ({
  viewStore : state.collections,
});
const mapDisptachToProps = dispatch => ({
  loadSpec       : (collectionName) => dispatch(loadSpec(collectionName)),
  loadData       : (collectionName, query) => dispatch(loadData(collectionName, query)),
  deleteTemplate : collectionName => dispatch(deleteTemplate(collectionName)),
  starCollection : collectionName => dispatch(starCollection(collectionName)),
  updateTemplate : (collectionName, data) => dispatch(updateTemplate(collectionName, data)),
});

export default connect(mapStateToProps, mapDisptachToProps)(Viewer);
