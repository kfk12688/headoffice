import React, { Component } from "react";
import { connect } from "react-redux";
import { StickyContainer, Sticky } from "react-sticky";
import { PaginationGrid, NavLink, Pagination, FavoriteCell, Button, Modal } from "components";
import { clearMenuState } from "dataflow/menu/actions";
import { loadSpec, loadData } from "dataflow/collections/actions";
import EditTemplateForm from "../../Forms/NewTemplateForm";
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

  render() {
    const { viewStore, params : { collectionName } } = this.props;
    const { data, spec, isLoading, count, templateName } = !!viewStore[collectionName] && viewStore[collectionName];
    let dataObj = (!!data && !!data[this.state.page]) ? data[this.state.page] : {};
    let specObj = !!spec ? spec : [];

    return (
      <div className="row">
        <div className="col-md-10 offset-md-1">
          <StickyContainer>
            <div className="row" style={{ marginTop : "1rem" }}>
              <div className="col-md-9">
                <Sticky stickyStyle={{ backgroundColor : "white", zIndex : 100 }}>
                  <div className="row">
                    <div className="col-md-12">
                      <h4>{templateName || collectionName}&nbsp;
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
                      spec={specObj}
                      data={dataObj}
                      isLoading={isLoading}
                    />
                  </div>
                </div>
              </div>

              <div className="col-md-3">
                <Sticky stickyStyle={{ paddingTop : 8 }}>
                  <div className="btn-block btn-group-vertical">
                    <Button><NavLink to="collections" faName="times-circle-o">Close View</NavLink></Button>
                    <Button>
                      <NavLink to={`collections/entry/${collectionName}`} faName="arrow-circle-o-right">
                        Entry View
                      </NavLink>
                    </Button>
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

Viewer.propTypes = {
  // route
  params : React.PropTypes.object,

  // state
  viewStore : React.PropTypes.object.isRequired,

  // actions
  clearMenuState : React.PropTypes.func.isRequired,
  loadSpec       : React.PropTypes.func,
  loadData       : React.PropTypes.func,
};

const mapStateToProps = state => ({
  viewStore : state.collections,
});

const mapDisptachToProps = dispatch => ({
  clearMenuState : () => dispatch(clearMenuState()),
  loadSpec       : (collectionName) => dispatch(loadSpec(collectionName)),
  loadData       : (collectionName, query) => dispatch(loadData(collectionName, query)),
});

export default connect(mapStateToProps, mapDisptachToProps)(Viewer);
