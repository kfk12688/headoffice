/**
 * Created by sharavan on 18/05/16.
 */

import "font-awesome-webpack";
import * as React from "react";
import * as FontAwesome from "react-fontawesome";
import { IDataGridBodyCellProps, IRowProps, IColProps } from "./DataGridInterfaces";
import { red500 } from "../../client/styles/colors";

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
  public getElement(renderType: string): React.ReactNode {
    switch (renderType) {
      case "number":
      case "date":
        return this.NumericCell;
      case "checkbox":
        return this.CheckboxCell;
      case "favorite":
        return this.FavoriteCell;
      default:
      case "text":
        return this.TextCell;
    }
  }

  private TextCell(props: any): React.StatelessComponent<any> {
    const style = {
      textAlign: "left",
    };
    return (
      <div style={style}>
        <span handler={ props.handleClick }>{props.value}</span>
      </div>
    );
  };

  private NumericCell(props: any): React.StatelessComponent<any> {
    const style = {
      textAlign: "right",
    };

    return (
      <div style={style}>
        <span handler={ props.handleClick }>{props.value}</span>
      </div>
    );
  };

  private CheckboxCell(props: any): React.StatelessComponent<any> {
    const faStyle                        = {
      fontSize: 15,
    };
    const isSelected: boolean            = props.isSelected;
    let selectedElement: React.ReactNode = undefined;

    if (isSelected) {
      selectedElement = <FontAwesome name="check-square" style={faStyle}/>;
    } else {
      selectedElement = <FontAwesome name="square-o" style={faStyle}/>;
    }

    return selectedElement;
  };

  private FavoriteCell(props: any): React.StatelessComponent<any> {
    const isStarred: boolean            = props.value;
    const faStyle                       = {
      color   : isStarred ? red500 : "inherit",
      fontSize: 15,
    };
    let starredElement: React.ReactNode = undefined;

    if (isStarred) {
      starredElement = <FontAwesome name="star" style={faStyle}/>;
    } else {
      starredElement = <FontAwesome name="star-o" style={faStyle}/>;
    }

    return starredElement;
  }
}

class DataGridBodyCell extends React.Component <IDataGridBodyCellProps, {}> {
  node: React.ReactNode;

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
            }
          )
        }
      </div>
    );
  }
}

export { DataGridBodyCell }
