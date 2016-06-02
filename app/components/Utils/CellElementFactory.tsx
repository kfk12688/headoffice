/**
 * Created by sharavan on 02/06/16.
 */
import "font-awesome-webpack";
import * as React from "react";
import { PopupButton } from "../Popup";
import { NavLink } from "../NavLink";
import { red500, grey300, grey50 } from "../../client/styles/colors";
import "./CellElementFactory.less";
let FontAwesome: any = require("react-fontawesome");

export default class CellElementFactory {
  public getElement(renderType: string) {
    switch (renderType) {
      case "number":
      case "date":
        return this.NumericCell;
      case "checkbox":
        return this.CheckboxCell;
      case "favorite":
        return this.FavoriteCell;
      case "list":
        return this.ListCell;
      case "reference":
        return this.ReferenceCell;
      case "link":
        return this.LinkCell;
      case "action":
        return this.ActionCell;
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

  private LinkCell(props: any): React.ReactElement<any> {
    const style = {textAlign: "left"};
    let url = props.linkRef.path + "/" + props.row[props.linkRef.urlKey];
    url = url.replace(/ /g, "");
    return (
      <div style={style}>
        <NavLink to={url}>{props.value}</NavLink>
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
  }

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
  }

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

  private ReferenceCell(props: any): React.ReactElement<any> {
    const style = {
      div : { textAlign: "left" },
      fa  : { margin: 4 },
      span: {
        backgroundColor: grey50,
        border         : "1px solid " + grey300,
        borderRadius   : 4,
        padding        : "2px 3px",
      },
    };
    return (
      <div style={style.div}>
        <span style={style.span}>{props.value.refTable.name}</span>
        <FontAwesome style={style.fa} name="long-arrow-right"/>
        <span style={style.span}>{props.value.refField.name}</span>
      </div>
    );
  }

  private ListCell(props: any): React.ReactElement<any> {
    const style = { textAlign: "left" };
    return (
      <div style={style}>
        <span handler={ props.handleClick }>{props.value.name}</span>
      </div>
    );
  }

  private ActionCell(props: any): React.ReactElement<any> {
    return (
      <div className="action-cell">
        <div className="action-cell-inner">
          <PopupButton label="" faName="ellipsis-v">
            <div>Edit Row</div>
            <div>Delete</div>
          </PopupButton>
        </div>
      </div>
    );
  }
}
