import React from "react";
import { ActionCell } from "./ActionCell";
import { CheckboxCell } from "./CheckboxCell";
import { FavoriteCell } from "./FavoriteCell";
import { LinkCell } from "./LinkCell";
import { ListCell } from "./ListCell";
import { NumberCell } from "./NumberCell";
import { RefCell } from "./RefCell";
import { TextCell } from "./TextCell";
import { PopupButton } from "../Popup";

function getCell(transform, type, row, col, isSelected) {
  if (type === "number") {
    return React.createElement(NumberCell, { value : transform() });
  }
  if (type === "checkbox") {
    const value = isSelected;
    return React.createElement(CheckboxCell, { value });
  }
  if (type === "favorite") {
    return React.createElement(FavoriteCell, { value : transform() });
  }
  if (type === "list") {
    return React.createElement(ListCell, { value : transform() });
  }
  if (type === "reference") {
    return React.createElement(RefCell, { value : transform() });
  }
  if (type === "link") {
    const value = {
      text : transform(),
      urlKey : row[col.linkRef.urlKey],
      path : col.linkRef.path,
    };

    return React.createElement(LinkCell, { value });
  }
  if (type === "action") {
    // const value = col.actions;
    const value =
      <PopupButton label="" faName="ellipsis-v">
        <div>Edit Row</div>
        <div>Delete</div>
      </PopupButton>;
    return React.createElement(ActionCell, { value });
  }
  return React.createElement(TextCell, { value : transform() });
}

export function renderDGCell(type, row, col, isSelected) {
  function transform() {
    let value = null;

    if (col.cellFormatter !== undefined) {
      value = col.cellFormatter(row[col.dataKey]);
    } else {
      value = row[col.dataKey];
    }

    return value;
  }

  return getCell(transform, type, row, col, isSelected);
}

export function renderEGCell(type, row, col, colKey) {
  function transform() {
    let value = null;

    if ((row[colKey] === null) || !("val" in row[colKey])) {
      return value;
    }

    if (col.cellFormatter !== undefined) {
      value = col.cellFormatter(row[colKey].val);
    } else {
      value = row[colKey].val;
    }

    return value;
  }

  return getCell(transform, type, row, col);
}

export { ActionCell } from "./ActionCell";
export { CheckboxCell } from "./CheckboxCell";
export { FavoriteCell } from "./FavoriteCell";
export { LinkCell } from "./LinkCell";
export { ListCell } from "./ListCell";
export { NumberCell } from "./NumberCell";
export { RefCell } from "./RefCell";
export { TextCell } from "./TextCell";
