import React, { Component } from "react";
import { connect } from "react-redux";
import { StickyContainer, Sticky } from "react-sticky";
import { Link } from "react-router";
import moment from "moment";
import { PaginationGrid, Pagination, FavoriteCell, Button, Modal } from "components";
import { clearMenuState } from "dataflow/menu/actions";
import { deleteTemplate, starTemplate, updateTemplate } from "dataflow/templates/actions";
import { loadSpec, loadData } from "dataflow/collections/actions";
import EditTemplateForm from "../../Forms/EditTemplateForm";
import styles from "./index.less";

class Viewer extends Component {
  constructor() {
    super();
    this.state = {
      page      : 1,
      limit     : 30,
      showModal : false,
    };

    this.loadData = this.loadData.bind(this);
    this.setPage = this.setPage.bind(this);
    this.setLimit = this.setLimit.bind(this);
    this.deleteTemplate = this.deleteTemplate.bind(this);
    this.updateTemplate = this.updateTemplate.bind(this);
    this.starTemplate = this.starTemplate.bind(this);
  }

  componentWillMount() {
    const { collectionName } = this.props.params;
    const { page, limit } = this.state;

    this.props.loadSpec(collectionName)
      .then(this.loadData(page, limit));
  }

  setPage(pageIdx) {
    let newIdx = pageIdx;
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
    const collectionName = this.props.params.collectionName;
    const {
      data = {}, userSchema = [], isLoading, count, templateName,
      workbook, modifiedAt, createdAt, createdBy, isFavorite,
    } = this.props.viewStore[collectionName];
    let dataObj = (!!data && !!data[this.state.page]) ? data[this.state.page] : {};
    const workbookName = !!workbook && !!workbook.name && workbook.name || "";
    const createdByUser = !!createdBy && !!createdBy.name && createdBy.name || "";

    return (
      <div className="row">
        <div className="col-md-10 offset-md-1">
          <StickyContainer>
            <div className="row" style={{ marginTop : "1rem" }}>
              <div className="col-md-9">
                <Sticky stickyStyle={{ backgroundColor : "white", zIndex : 100 }}>
                  <div className="row">
                    <div className="col-md-12">
                      <h4>{templateName}&nbsp;
                        <small className="text-muted">({count || 0} Entries)</small>
                      </h4>
                    </div>
                  </div>

                  <div className="row">
                    <Pagination
                      className="col-md-12"
                      setLimit={this.setLimit}
                      setPage={this.setPage}
                      activePage={this.state.page}
                      limit={this.state.limit}
                    />
                  </div>
                </Sticky>

                <div className="row">
                  <div className="col-md-12">
                    <PaginationGrid
                      topOffset={114}
                      spec={userSchema}
                      data={dataObj}
                      isLoading={isLoading}
                    />
                  </div>
                </div>
              </div>

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
                  <Button block onClick={this.starTemplate}>
                    Make Favorite
                    &nbsp;
                    <FavoriteCell value={isFavorite || false} inheritSize/>
                  </Button>

                  <div className={styles.divider}/>
                  <div className={styles.attributes}>
                    <div>Created By : <span>{createdByUser}</span></div>
                    <div>Created At : <span>{moment(createdAt).format("DD-MM-YYYY")}</span></div>
                    <div>Last Modified : <span>{moment(modifiedAt).format("DD-MM-YY h:m A")}</span></div>
                    <div>Belongs to : <span>{workbookName}</span></div>
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

Viewer.propTypes = {
  // route
  params         : React.PropTypes.object,
  // state
  viewStore      : React.PropTypes.object.isRequired,
  // actions
  clearMenuState : React.PropTypes.func.isRequired,
  loadSpec       : React.PropTypes.func,
  loadData       : React.PropTypes.func,
  deleteTemplate : React.PropTypes.func.isRequired,
  starTemplate   : React.PropTypes.func.isRequired,
  updateTemplate : React.PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  viewStore : state.collections,
});

const mapDisptachToProps = dispatch => ({
  clearMenuState : () => dispatch(clearMenuState()),
  loadSpec       : (collectionName) => dispatch(loadSpec(collectionName)),
  loadData       : (collectionName, query) => dispatch(loadData(collectionName, query)),
  deleteTemplate : collectionName => dispatch(deleteTemplate(collectionName)),
  starTemplate   : collectionName => dispatch(starTemplate(collectionName)),
  updateTemplate : (collectionName, data) => dispatch(updateTemplate(collectionName, data)),
});

export default connect(mapStateToProps, mapDisptachToProps)(Viewer);
