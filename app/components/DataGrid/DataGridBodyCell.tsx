/**
 * Created by sharavan on 18/05/16.
 */
import "font-awesome-webpack";
import * as React from "react";
import { NavLink } from "../NavLink/NavLink";
import { IDataGridBodyCellProps, IRowProps, IColProps } from "./DataGridInterfaces";
import { red500 } from "../../client/styles/colors";
let FontAwesome: any = require("react-fontawesome");

function formatCell(row: IRowProps, col: IColProps): string | number {
  let value: string | number = undefined;
  if (col.cellFormatter !== undefined) {
    value = col.cellFormatter(row[col.dataKey]);
  } else {
    value = row[col.dataKey];
  }

  return value;
}

class CellElementFactory {
  public getElement(renderType: string) {
    switch (renderType) {
      case "number":
      case "date":
        return this.NumericCell;
      case "checkbox":
        return this.CheckboxCell;
      case "favorite":
        return this.FavoriteCell;
      case "link":
        return this.LinkCell;
      default:
      case "text":
        return this.TextCell;
    }
  }

  private TextCell(props: any): React.ReactElement<any> {
    const style = {
      textAlign: "left",
    };
    return (
      <div style={style}>
        <span handler={ props.handleClick }>{props.value}</span>
      </div>
    );
  };

  private NumericCell(props: any): React.ReactElement<any> {
    const style = {
      textAlign: "right",
    };

    return (
      <div style={style}>
        <span handler={ props.handleClick }>{props.value}</span>
      </div>
    );
  };

  private CheckboxCell(props: any): React.ReactElement<any> {
    const faStyle                                = {
      fontSize: 15,
    };
    const isSelected: boolean                    = props.isSelected;
    let selectedElement: React.ReactElement<any> = undefined;

    if (isSelected) {
      selectedElement = <FontAwesome name="check-square" style={faStyle}/>;
    } else {
      selectedElement = <FontAwesome name="square-o" style={faStyle}/>;
    }

    return selectedElement;
  };

  private FavoriteCell(props: any): React.ReactElement<any> {
    const isStarred: boolean                    = props.value;
    const faStyle                               = {
      color   : isStarred ? red500 : "inherit",
      fontSize: 15,
    };
    let starredElement: React.ReactElement<any> = undefined;

    if (isStarred) {
      starredElement = <FontAwesome name="star" style={faStyle}/>;
    } else {
      starredElement = <FontAwesome name="star-o" style={faStyle}/>;
    }

    return starredElement;
  }

  private LinkCell(props: any): React.ReactElement<any> {
    let url = props.linkRef.path + "/" + props.row[props.linkRef.urlKey];
    url     = url.replace(/ /g, "");
    return (
      <div style={{textAlign: "left"}}>
        <NavLink to={url}>{props.value}</NavLink>
      </div>
    );
  }
}

class DataGridBodyCell extends React.Component <IDataGridBodyCellProps, {}> {
  node: React.StatelessComponent<any>;

  componentWillMount(): void {
    let factory = new CellElementFactory();
    this.node   = factory.getElement(this.props.col.renderType);
  }

  render(): JSX.Element {
    const styles = {
      boxSizing: "border-box",
      display  : "inline-block",
      width    : this.props.colWidth,
    };

    return (
      <div
        className="ho-datagrid-body-cell"
        style={styles}
        onClick={this.props.handleClick}
      >
        {
          React.createElement(
            this.node,
            {
              handleClick: this.props.handleClick,
              isSelected : this.props.isSelected,
              value      : formatCell(this.props.row, this.props.col),
              linkRef    : this.props.col.linkRef,
              row        : this.props.row,
            }
          )
        }
      </div>
    );
  }
}

export { DataGridBodyCell }
