/**
 * Created by sharavan on 15/06/16.
 */
import * as React from "react";
import { Grid, Row, DG, Divider, Col } from "components/index";
import { Navigator, Breadcrumb, Search, ContextMenu } from "./common/index";
import { IColProps } from "../components/DataGrid/DGTypes";
import "../styles/lib.less";
import * as dg from "../data/datagrid";
import { toggleSidebar } from "../actions/contextMenuAC";
import { connect } from "react-redux";
import { sortColumn, toggleRow, selectAllRows, clearRowSelection } from "../actions/contentAC";

const cx: any = require("classnames")

interface IState {
  rollUp?: boolean
}

interface IProps {
  actionsMenu: any
  content: any
  toggleSidebar: Function
  toggleRow: Function
  sortColumn: (sortKey: string, sortOrder: string) => void
}

class App extends React.Component <IProps, {}> {
  state: IState = {
    rollUp: false
  };

  colSortItems: {
    items: React.ReactElement<any>[];
    displayText: any
  } = undefined;

  componentWillMount(): void {
    let sortOrders  = [{
      date  : "New - Old",
      number: "Least - Most",
      order : "asc",
      text  : "A-Z",
      link  : "A-Z",
    }, {
      date  : "Old - New",
      number: "Most - Least",
      order : "desc",
      text  : "Z-A",
      link  : "Z-A",
    }];
    let items       = [];
    let displayText = {};

    for (let colIdx in dg.cols) {
      if (dg.cols.hasOwnProperty(colIdx)) {
        let col: IColProps         = dg.cols[colIdx];
        let isColSortable: boolean = (col.sortable === undefined) || col.sortable;

        if (isColSortable) {
          let colRenderType = (col.renderType === undefined) ? "text" : col.renderType;
          displayText[col.dataKey]    = {}
          for (let i = 0; i < 2; i++) {
            items.push(<div
                callBack={this.props.sortColumn.bind(this, col.dataKey, sortOrders[i].order)}
                dataKey={col.dataKey}
                key={+(colIdx + i + "")}
              >
                {col.text + " (" + sortOrders[i][colRenderType] + ")"}
              </div>
            )

            displayText[col.dataKey][i] = col.text + " (" + sortOrders[i][colRenderType] + ")"
          }
        }
      }
    }

    this.colSortItems = {
      items,
      displayText
    }
  }

  render(): JSX.Element {
    const { content, actionsMenu } = this.props
    const datagridContainerStyle: any = {
      left: !actionsMenu.showSidebar && 0,
    };

    let sortOrderIndex = content.sortAscending ? 0 : 1;

    return (
      <Grid>
        { /* Roll up/down gimmick */ }
        <div
          onClick={this.handleRollUpToggle}
          className={cx({
            "roll-down-handle" : this.state.rollUp,
            "roll-up-handle" : !this.state.rollUp,
          })}
        >
          <span/>
        </div>

        { /* App Navigator */ }
        <Navigator rollUp={this.state.rollUp}/>

        { /* Breadcrumbs */ }
        <Breadcrumb rollUp={this.state.rollUp}/>

        { /* View Container */ }
        <Row
          fullWidth
          className={cx("ho-staging-container",{
          "rolled-up" : this.state.rollUp,
          "rolled-down" : !this.state.rollUp,
        })}
        >
          <div>
            { /* Context Menu */ }
            <ContextMenu
              toggleSidebar={this.props.toggleSidebar}
              actionsMenu={actionsMenu}
              countItems={content.countSelected}
              colSortItems={ this.colSortItems.items }
              sortKey={ this.colSortItems.displayText[content.sortKey][sortOrderIndex] }
              selectAllRows={this.props.selectAllRows}
              clearRowSelection={this.props.clearRowSelection}
            />

            <Divider className="ho-action-container-divider" fullSpan/>

            { /* Display Area */ }
            <Row className="ho-content-container">
              { /* A search helper to find specific data */ }
              <Col className="ho-search-container">
                <Search/>
              </Col>

              { /* Datagrid that shows the list of relevant information */ }
              <Col className="ho-datagrid-container" style={datagridContainerStyle}>
                <DG
                  cols={dg.cols}
                  colWidths={dg.colWidths}
                  rows={content.data}
                  colSortFunction={this.props.sortColumn}
                  sortKey={content.sortKey}
                  sortAscending={content.sortAscending}
                  onRowClick={this.props.toggleRow}
                />
              </Col>
            </Row>

          </div>
        </Row>
      </Grid>
    )
  }

  public getBreadcrumbTitle(): string {
    return "All Tables";
  }

  private handleRollUpToggle: Function = () => {
    let rollUp = (this.state.rollUp) ? false : true
    this.setState({ rollUp: rollUp })
  }
}

const mapStateToProps = (state) => {
  return {
    actionsMenu: state.contextMenu,
    content    : state.content
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    toggleSidebar: () => dispatch(toggleSidebar()),
    selectAllRows: () => dispatch(selectAllRows()),
    clearRowSelection: () => dispatch(clearRowSelection()),
    sortColumn   : (sortKey, sortOrder) => dispatch(sortColumn(sortKey, sortOrder)),
    toggleRow    : (index) => dispatch(toggleRow(index))
  }
}

const AppConnector = connect(mapStateToProps, mapDispatchToProps)(App)

export { AppConnector }
