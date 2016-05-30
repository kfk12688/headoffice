import * as React from "react";
import { SearchContainer } from "../../Containers/SearchContainer";
import { cols, colWidths, data } from "../../data/datagrid";
import { Row, Col, Divider, Button, PopupButton, PopupTextBox, DataGrid } from "components";
import { IRowProps, IColProps } from "components/DataGrid/DataGridInterfaces";
import "font-awesome-webpack";
const FontAwesome: any = require("react-fontawesome");
const cx: any          = require("classnames");

interface IState {
  showSearchContainer?: boolean;
  rows?: IRowProps;
  sortKey?: string;
  sortAscending?: boolean;
}

class Views extends React.Component <{}, IState> {
  state: IState = {
    rows               : data,
    showSearchContainer: true,
    sortAscending      : true,
    sortKey            : "name",
  };

  colSortItems: React.ReactElement<any>[] = undefined;

  componentWillMount(): void {
    let sortOrders = [{
      date  : "New - Old",
      number: "Least - Most",
      order : "asc",
      text  : "A-Z",
    }, {
      date  : "Old - New",
      number: "Most - Least",
      order : "desc",
      text  : "Z-A",
    }];

    let items: React.ReactElement<any>[] = [];

    for (let colIdx in cols) {
      if (cols.hasOwnProperty(colIdx)) {
        let col: IColProps = cols[colIdx];

        let isColSortable: boolean = (col.sortable === undefined) || col.sortable;
        if (isColSortable) {
          let colRenderType = (col.renderType === undefined) ? "text" : col.renderType;
          for (let i = 0; i < 2; i++) {
            items.push(React.createElement(
              "div",
              {
                callBack: this.colSortFunction.bind(this, col.dataKey, sortOrders[i].order),
                dataKey : col.dataKey,
                key     : +(colIdx + i + ""),
              },
              col.text + " (" + sortOrders[i][colRenderType] + ")"
            ));
          }
        }
      }
    }
    this.colSortItems = items;
  }

  render(): JSX.Element {
    const datagridContainerStyle: any = {
      left: !this.state.showSearchContainer && 0,
    };

    return (
      <div>
        { /* Actions */ }
        <Row fullWidth className="ho-action-container">
          <Col size={6} className="left">
            <span>
              <Button faName="sliders" onClick={this.toggleSearchContainerCb}
                      className={cx("icon", {"active" : this.state.showSearchContainer})}/>

              <Button className="add-btn" faName="plus"> Add View</Button>

              <PopupButton label="0 selected">
                <div>Select All</div>
                <div>Clear selection</div>
              </PopupButton>
            </span>
            <span>
              <Divider vertical size={{h:24, w:1}} style={{ marginRight: 5 }}></Divider>
              <PopupButton label="Actions">
                <div>Edit Template</div>
                <div>Tag...</div>
                <div>Set Permissions</div>
              </PopupButton>
            </span>
          </Col>
          <Col size={6} className="right">
            <span>Sort by : </span>
              <span className="sort-block">
                <PopupTextBox matchParentWidth label="Name (A-Z)">
                  {this.colSortItems}
                </PopupTextBox>
              </span>
          </Col>
        </Row>

        <Divider className="ho-action-container-divider" fullSpan/>

        { /* Display Area */ }
        <Row className="ho-content-container">
          <Col className="ho-search-container">
            <SearchContainer/>
          </Col>

          <Col className="ho-datagrid-container" style={datagridContainerStyle}>
            <DataGrid
              cols={cols}
              colWidths={colWidths}
              rows={this.state.rows}
              colSortFunction={this.colSortFunction}
              sortKey={this.state.sortKey}
              sortAscending={this.state.sortAscending}
            />
          </Col>
        </Row>

      </div>
    );
  }

  public getBreadcrumbTitle() {
    return <span><FontAwesome name="desktop"/> All Views</span>;
  }

  private colSortFunction: Function = (dataKey: string, sortOrder: string, event: React.MouseEvent) => {
    let sortedRows: IRowProps  = undefined;
    let sortAscending: boolean = undefined;

    if (sortOrder === "asc") {
      sortedRows    = this.state.rows.sort((a: IRowProps, b: IRowProps) => {
        return +(a[dataKey] > b[dataKey]) || +(a[dataKey] === b[dataKey]) - 1;
      });
      sortAscending = true;
    } else if (sortOrder === "desc") {
      sortedRows    = this.state.rows.sort((a: IRowProps, b: IRowProps) => {
        return +(a[dataKey] < b[dataKey]);
      });
      sortAscending = false;
    }

    this.setState({
      rows         : sortedRows,
      sortAscending: sortAscending,
      sortKey      : dataKey,
    });
  };

  private toggleSearchContainerCb: Function = () => {
    this.state.showSearchContainer ?
    this.setState({ showSearchContainer: false }) :
    this.setState({ showSearchContainer: true });
  }
}

export { Views };
