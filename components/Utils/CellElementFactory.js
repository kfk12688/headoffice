/**
 * Created by sharavan on 02/06/16.
 */
import React from "react";
import { PopupButton } from "../Popup/index";
import { NavLink } from "../NavLink/index";
import { red500, grey300, grey50 } from "../../styles/colors";
import "./CellElementFactory.less";
import FontAwesome from "react-fontawesome";

export default class CellElementFactory {
  getElement(renderType:string) {
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

  TextCell(props) {
    const style = {
      textAlign : "left",
    };
    return (
      <div style={style}>
        <span handler={props.handleClick}>{props.value}</span>
      </div>
    );
  }

  LinkCell(props) {
    const style = { textAlign: "left" };
    let url = props.linkRef.path + "/" + props.row[props.linkRef.urlKey];
    url = url.replace(/ /g, "");
    return (
      <div style={style}>
        <NavLink to={url}>{props.value}</NavLink>
      </div>
    );
  }

  NumericCell(props) {
    const style = {
      textAlign : "right",
    };

    return (
      <div style={style}>
        <span handler={props.handleClick}>{props.value}</span>
      </div>
    );
  }

  CheckboxCell(props) {
    const faStyle = {
      fontSize : 15,
    };
    const isSelected:boolean = props.isSelected;
    let selectedElement = undefined;

    if (isSelected) {
      selectedElement = <FontAwesome name="check-square" style={faStyle} />;
    } else {
      selectedElement = <FontAwesome name="square-o" style={faStyle} />;
    }

    return selectedElement;
  }

  FavoriteCell(props) {
    const isStarred:boolean = props.value;
    const faStyle = {
      color    : isStarred ? red500 : "inherit",
      fontSize : 15,
    };
    let starredElement = undefined;

    if (isStarred) {
      starredElement = <FontAwesome name="star" style={faStyle} />;
    } else {
      starredElement = <FontAwesome name="star-o" style={faStyle} />;
    }

    return starredElement;
  }

  ReferenceCell(props) {
    const style = {
      div  : { textAlign: "left" },
      fa   : { margin: 4 },
      span : {
        backgroundColor : grey50,
        border          : "1px solid " + grey300,
        borderRadius    : 4,
        padding         : "2px 3px",
      },
    };
    return (
      <div style={style.div}>
        <span style={style.span}>{props.value.refTable.name}</span>
        <FontAwesome style={style.fa} name="long-arrow-right" />
        <span style={style.span}>{props.value.refField.name}</span>
      </div>
    );
  }

  ListCell(props) {
    const style = { textAlign: "left" };
    return (
      <div style={style}>
        <span handler={props.handleClick}>{props.value.name}</span>
      </div>
    );
  }

  ActionCell(props) {
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
