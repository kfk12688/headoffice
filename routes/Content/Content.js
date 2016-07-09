import React, { Component } from "react";
import { connect } from "react-redux";
import { Breadcrumb, ContentMenu, Search, DG } from "components";
import * as filterActions from "../../dataflow/filter/actions";
import * as cmActions from "../../dataflow/menu/actions";
import * as contentActions from "../../dataflow/content/actions";
import { getRows, Formatter as formatter } from "../utils";
import styles from "./Content.less";

class Content extends Component {
  constructor(props) {
    super(props);
    this.colSpec = [
      {
        headerStyle : { borderRight : 0 },
        name        : "checkbox-col",
        renderType  : "checkbox",
        sortable    : false,
        text        : "",
      },
      {
        dataKey     : "favorite",
        headerStyle : { borderRight : 0 },
        name        : "favorite-col",
        renderType  : "favorite",
        sortable    : false,
        text        : "",
      },
      {
        dataKey    : "templateName",
        linkRef    : {
          path   : "/content/edit",
          urlKey : "_id",
        },
        name       : "name-col",
        renderType : "link",
        text       : "Name",
      },
      {
        cellFormatter : formatter.toDate,
        dataKey       : "createdAt",
        name          : "created-at-col",
        renderType    : "date",
        sortable      : true,
        text          : "Created At",
      },
      {
        cellFormatter : formatter.toDate,
        dataKey       : "updatedAt",
        name          : "updated-at-col",
        renderType    : "date",
        sortable      : true,
        text          : "Updated At",
      },
    ];
    this.colWidths = {
      "checkbox-col"   : 38,
      "favorite-col"   : 38,
      "name-col"       : 150,
      "created-at-col" : 150,
      "updated-at-col" : 150,
    };
    this.colSortItems = this.getColumnSortList(props.sortColumn);
  }

  componentWillMount() {
    this.props.clearFilter();
    this.props.clearMenu();
    this.props.loadContentList();
  }

  getColumnSortList(cb) {
    const sortOrders = [
      {
        date   : "New - Old",
        number : "Least - Most",
        order  : "asc",
        text   : "A-Z",
        link   : "A-Z",
      }, {
        date   : "Old - New",
        number : "Most - Least",
        order  : "desc",
        text   : "Z-A",
        link   : "Z-A",
      },
    ];
    const items = [];
    const displayText = {};
    const cols = this.colSpec;

    for (const colIdx in cols) {
      if (cols.hasOwnProperty(colIdx)) {
        const col = cols[colIdx];
        const isColSortable = (col.sortable === undefined) || col.sortable;

        if (isColSortable) {
          const colRenderType = (col.renderType === undefined) ? "text" : col.renderType;
          displayText[col.dataKey] = {};
          for (let i = 0; i < 2; i++) {
            const name = `${col.text} (${sortOrders[i][colRenderType]})`;

            items.push(
              <div
                callBack={cb.bind(this, col.dataKey, sortOrders[i].order)}
                dataKey={col.dataKey}
                key={`${colIdx}${i}`}
              >
                {name}
              </div>
            );

            displayText[col.dataKey][i] = name;
          }
        }
      }
    }

    return {
      items,
      displayText,
    };
  }

  renderChildren() {
    if (this.props.children) {
      return this.props.children;
    }

    const {
      list, filter, actionsMenu, rows, toggleSidebar, selectAllRows,
      clearRowSelection, filterChangeHandlers, sortColumn, toggleRow
    } = this.props;
    const sortOrderIndex = filter.sortAscending ? 0 : 1;
    const sortKey = filter.sortKey ? this.colSortItems.displayText[filter.sortKey][sortOrderIndex] : null;

    return (
      <div>
        {/* Contextual Menu */}
        <ContentMenu
          className={styles.contextMenu}
          toggleSidebar={toggleSidebar}
          actionsMenu={actionsMenu}
          countItems={list.selectedKeys.length}
          colSortItems={this.colSortItems.items}
          sortKey={sortKey}
          selectAllRows={selectAllRows}
          clearRowSelection={clearRowSelection}
          addNewTemplate={this.props.addNewTemplate}
        />

        <div>
          {/* Search Container */}
          {
            actionsMenu.showSidebar &&
            <Search
              className={styles.search}
              filterData={filter}
              changeHandlers={filterChangeHandlers}
            />
          }

          {/* DataGrid Container */}
          <DG
            className={styles.datagrid}
            style={{ left: !actionsMenu.showSidebar && 0 }}
            isLoading={list.isLoading}
            cols={this.colSpec}
            colWidths={this.colWidths}
            rows={rows}
            colSortFunction={sortColumn}
            sortKey={filter.sortKey}
            sortAscending={filter.sortAscending}
            onRowClick={toggleRow}
            selectedKeys={list.selectedKeys}
          />
        </div>
      </div>
    );
  }

  render() {
    const { rollUp } = this.props;

    return (
      <div
        className={styles.base}
        style={{ top: rollUp ? 62 : 0 }}
      >

        {/* Breadcrumb */}
        <Breadcrumb
          className={styles.breadcrumb}
        />

        {this.renderChildren()}
      </div>
    );
  }
}

const filterBindings = {
  dateFilter     : "createdAt",
  textFilter     : "owner",
  recentFilter   : "createdAt",
  favoriteFilter : "favorite",
};

const mapStateToProps = (state) => ({
  list        : state.content,
  actionsMenu : state.menu,
  filter      : state.filter,
  rows        : getRows(state.content.data, state.filter, filterBindings),
});

const mapDispatchToProps = (dispatch) => ({
  toggleSidebar        : () => dispatch(cmActions.toggleMenuSidebar()),
  selectAllRows        : () => dispatch(contentActions.selectAllContent()),
  clearRowSelection    : () => dispatch(contentActions.clearContentSelection()),
  sortColumn           : (sortKey, sortOrder) => dispatch(filterActions.sortFilter(sortKey, sortOrder)),
  toggleRow            : (index) => dispatch(contentActions.toggleContent(index)),
  loadContentList      : (params) => dispatch(contentActions.loadTemplate(params)),
  addNewTemplate       : (params) => dispatch(contentActions.addTemplate(params)),
  clearFilter          : () => dispatch(filterActions.clearFilterState()),
  clearMenu            : () => dispatch(cmActions.clearMenuState()),
  filterChangeHandlers : {
    setDateModifiedStart : (e) => dispatch(filterActions.setFilterDtModStart(e)),
    setDateModifiedEnd   : (e) => dispatch(filterActions.setFilterDtModEnd(e)),
    setOwner             : (e) => dispatch(filterActions.setFilterOwner(e)),
    setIsRecent          : (e) => dispatch(filterActions.setFilterIsRecent(e)),
    setIsStarred         : (e) => dispatch(filterActions.setFilterIsStarred(e)),
  },
});

export default
connect(mapStateToProps, mapDispatchToProps)(Content);
