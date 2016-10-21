import React, { Component } from "react";
import { connect } from "react-redux";
import { PaginationGrid, NavLinkBtn } from "components";
import { clearMenuState } from "dataflow/menu/actions";
import { loadSpec, loadData } from "dataflow/data/view/actions";
import { TitleBar } from "./TitleBar";
import styles from "./index.less";

class Editor extends Component {
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

  setPage(navigationMethod) {
    const { page, limit } = this.state;

    let pageIdx;
    if (navigationMethod === "prev") pageIdx = page - 1;
    if (navigationMethod === "next") pageIdx = page + 1;
    if (navigationMethod === "first") pageIdx = 1;
    if (navigationMethod === "last") pageIdx = 1;   // fixme

    this.setState({
      page : pageIdx,
      limit,
    });
    this.loadData(pageIdx, limit);
  }

  setLimit(e) {
    const { page } = this.state;
    const newLimit = e.target.value;

    this.setState({
      page,
      limit : newLimit,
    });
    this.loadData(page, newLimit);
  }

  loadSpec(templateID) {
    return new Promise(() => {
      this.props.loadSpec({ templateID });
    });
  }

  loadData(page, limit) {
    const { id:templateID } = this.props.params;
    this.props.loadData({ templateID, page, limit });
  }

  render() {
    const { viewStore } = this.props;
    const { spec, isLoading, id } = viewStore;
    let data = !!viewStore.data[this.state.page] ? viewStore.data[this.state.page] : {};

    return (
      <div className={styles.container}>
        <TitleBar
          className={styles.titleBar}
          store={viewStore}
        />

        <div className={styles.gridMetaContainer}>
          <div className={styles.sidebar}>
            <NavLinkBtn to="data" faName="times-circle-o">Close View</NavLinkBtn>
            <NavLinkBtn to={`data/entry/${id}`} faName="arrow-circle-o-right">Goto Entry View</NavLinkBtn>
          </div>

          <div className={styles.tableMetaContainer}>
            <select value={this.state.limit} onChange={this.setLimit}>
              <option value="15">15</option>
              <option value="30">30</option>
              <option value="50">50</option>
            </select>

            <div>
              <i className="fa fa-angle-double-left" onClick={e => this.setPage("first")}></i>
              <i className="fa fa-angle-left" onClick={e => this.setPage("prev")}></i>
              <i className="fa fa-angle-right" onClick={e => this.setPage("next")}></i>
              <i className="fa fa-angle-double-right" onClick={e => this.setPage("last")}></i>
            </div>

            <div className={styles.rightAlign}>{Object.keys(data).length} Entries</div>
          </div>
        </div>

        <PaginationGrid
          className={styles.grid}
          spec={spec}
          data={data}
          isLoading={isLoading}
        />
      </div>
    );
  }
}

Editor.propTypes = {
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

export default connect(mapStateToProps, mapDisptachToProps)(Editor);
