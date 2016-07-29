import React, { Component } from "react";
import { connect } from "react-redux";
import { Breadcrumb, Search, DG } from "components";
import { ContentMenu } from "./ContentMenu";
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
        dataKey     : "isFavorite",
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
          urlKey : "id",
        },
        name       : "name-col",
        renderType : "link",
        text       : "Name",
      },
      {
        dataKey    : "userRef.name",
        name       : "user-col",
        renderType : "text",
        text       : "User",
      },
      {
        dataKey    : "workBook.name",
        name       : "workbook-col",
        renderType : "text",
        text       : "Work Book",
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
        dataKey       : "modifiedAt",
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
      "user-col"       : 120,
      "workbook-col"   : 180,
      "created-at-col" : 150,
      "updated-at-col" : 150,
    };
    this.colSortItems = this.getColumnSortList(props.sortColumn);
  }

  componentWillMount() {
    this.props.loadTemplate();
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
      list, actionsMenu, rows, toggleSidebar, selectAll,
      clearSelection, sortColumn, toggleSelection,
      addTemplate, deleteTemplate
    } = this.props;

    const { filterChangeHandlers, filter } = this.props;
    const sortOrderIndex = filter.sortAscending ? 0 : 1;
    const sortKey = filter.sortKey ? this.colSortItems.displayText[filter.sortKey][sortOrderIndex] : null;

    const searchConfig = [
      {
        label         : "Owner",
        data          : filter.owner,
        changeHandler : filterChangeHandlers.setOwner,
        type          : "searchbox",
      },
      {
        label         : "Created on or after",
        data          : filter.dateModifiedStart,
        changeHandler : filterChangeHandlers.setDateModifiedStart,
        type          : "datebox",
      },
      {
        label         : "Created on or before",
        data          : filter.dateModifiedEnd,
        changeHandler : filterChangeHandlers.setDateModifiedEnd,
        type          : "datebox",
      },
      {
        label         : "Show starred only",
        data          : filter.isStarred,
        changeHandler : filterChangeHandlers.setIsStarred,
        type          : "checkbox",
      },
      {
        label         : "Recents only",
        data          : filter.isRecent,
        changeHandler : filterChangeHandlers.setIsRecent,
        type          : "checkbox",
      },
    ];

    return (
      <div>
        {/* Contextual Menu */}
        <ContentMenu
          className={styles.contextMenu}
          toggleSidebar={toggleSidebar}
          actionsMenu={actionsMenu}
          colSortItems={this.colSortItems.items}
          keys={rows.map(row => row.id)}
          sortKey={sortKey}
          selectAllRows={selectAll}
          clearRowSelection={clearSelection}
          addNewTemplate={addTemplate}
          deleteTemplate={deleteTemplate}
        />

        <div>
          {/* Search Container */}
          {
            actionsMenu.showSidebar &&
            <Search
              className={styles.search}
              config={searchConfig}
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
            onRowClick={toggleSelection}
            selectedKeys={actionsMenu.selectedKeys}
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
  selectAll            : (keys) => dispatch(cmActions.selectAll(keys)),
  clearSelection       : () => dispatch(cmActions.clearSelection()),
  toggleSelection      : (index) => dispatch(cmActions.toggleSelection(index)),
  sortColumn           : (sortKey, sortOrder) => dispatch(filterActions.sortFilter(sortKey, sortOrder)),
  loadTemplate         : (params) => dispatch(contentActions.loadTemplate(params)),
  deleteTemplate       : (params) => dispatch(contentActions.deleteTemplate(params)),
  addTemplate          : (params) => dispatch(contentActions.addTemplate(params)),
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
