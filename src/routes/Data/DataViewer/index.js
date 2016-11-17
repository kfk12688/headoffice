import React, { Component } from "react";
import { connect } from "react-redux";
import { PaginationGrid, NavLink, Pagination, StickySidebar, FavoriteCell, Button } from "components";
import { clearMenuState } from "dataflow/menu/actions";
import { loadSpec, loadData } from "dataflow/data/view/actions";
import { TitleBar } from "./TitleBar";
import styles from "./index.less";
import cx from "classnames";

class Viewer extends Component {
  constructor() {
    super();
    this.state = {
      page  : 1,
      limit : 15,
    };

    this.loadSpec = this.loadSpec.bind(this);
    this.loadData = this.loadData.bind(this);
    this.setPage = this.setPage.bind(this);
    this.setLimit = this.setLimit.bind(this);
  }

  componentWillMount() {
    const { id:templateID } = this.props.params;
    const { page, limit } = this.state;
    this.loadSpec(templateID).then(this.loadData(page, limit));
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

  loadSpec(templateID) {
    return new Promise(() => {
      this.props.loadSpec({
        templateID,
      });
    });
  }

  loadData(page, limit) {
    const { id:templateID } = this.props.params;
    this.props.loadData({
      templateID,
      page,
      limit,
    });
  }

  render() {
    const { viewStore } = this.props;
    const { spec, isLoading, id } = viewStore;
    let data = !!viewStore.data[this.state.page] ? viewStore.data[this.state.page] : {};

    return (
      <div className="row">
        <div className="col-md-10 offset-md-1">
          <TitleBar
            store={viewStore}
          />

          <div className="row">
            <div className={cx("col-md-12", styles.divider)}></div>
          </div>

          <div className="row">
            <div className="col-md-9">
              <span>{Object.keys(data).length} Entries</span>
              <Pagination
                setLimit={this.setLimit}
                setPage={this.setPage}
                activePage={this.state.page}
                limit={this.state.limit}
              />

              <PaginationGrid
                spec={spec}
                data={data}
                isLoading={isLoading}
              />
            </div>

            <div className="col-md-3">
              <StickySidebar top={150}>
                <div className="row">
                  <div className="col-md-12 btn-group-vertical">
                    <Button><NavLink to="data" faName="times-circle-o">Close View</NavLink></Button>
                    <Button><NavLink to={`data/entry/${id}`} faName="arrow-circle-o-right"> Entry
                      View</NavLink></Button>
                  </div>
                </div>

                <div className={styles.divider}/>

                <div className="row">
                  <div className="col-md-12">
                    <Button faName="edit" block>Edit Template</Button>
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
    )
      ;
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
  viewStore : state.data.view,
});

const mapDisptachToProps = dispatch => ({
  clearMenuState : () => dispatch(clearMenuState()),
  loadSpec       : (params) => dispatch(loadSpec(params)),
  loadData       : (params) => dispatch(loadData(params)),
});

export default connect(mapStateToProps, mapDisptachToProps)(Viewer);
