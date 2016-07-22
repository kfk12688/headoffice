import React from "react";
import { ActionCell } from "./ActionCell";
import { CheckboxCell } from "./CheckboxCell";
import { FavoriteCell } from "./FavoriteCell";
import { LinkCell } from "./LinkCell";
import { ListCell } from "./ListCell";
import { NumberCell } from "./NumberCell";
import { RefCell } from "./RefCell";
import { TextCell } from "./TextCell";
import styles from "./common.less";


function getCell(transform, type, row, col, isSelected) {
  if (type === "number") {
    return (<NumberCell value={transform()}/>);
  }
  if (type === "checkbox") {
    const value = isSelected;
    return (<CheckboxCell value={value}/>);
  }
  if (type === "favorite") {
    return (<FavoriteCell value={transform()}/>);
  }
  if (type === "list") {
    return (<ListCell value={transform()}/>);
  }
  if (type === "reference") {
    return (
      <RefCell
        value={{
          refTable : row.fieldReference && transform(row.fieldReference.tableName),
          refField : row.fieldReference && transform(row.fieldReference.fieldName),
        }}
      />
    );
  }
  if (type === "link") {
    const value = {
      text   : transform(),
      urlKey : row[col.linkRef.urlKey],
      path   : col.linkRef.path,
    };

    return (
      <div className={styles.linkCellContainer}>
        <LinkCell className={styles.linkCellContainerLink} value={value}/>
        <ActionCell className={styles.linkCellContainerAction} actions={[]}/>
      </div>
    );
  }
  if (type === "action") {
    return (<ActionCell data={row} actions={col.actions}/>);
  }
  return (<TextCell value={transform()}/>);
}

export function renderDGCell(type, row, col, isSelected) {
  function transform() {
    const dataKeyParts = col.dataKey.split(".");
    let value = null;
    let obj = row;

    for (let i = 0; i < dataKeyParts.length; i++) {
      const key = dataKeyParts[i];
      if (typeof obj[key] === "object") {
        obj = obj[key];
      } else {
        if (col.cellFormatter !== undefined) {
          value = col.cellFormatter(obj[key]);
        } else {
          value = obj[key];
        }
      }
    }

    return value;
  }

  return getCell(transform, type, row, col, isSelected);
}

export function renderEGCell(type, row, col, colKey) {
  function transform(rowData = row) {
    let value = null;

    if ((rowData[colKey] === null) || !("val" in rowData[colKey])) {
      return value;
    }

    if (col.cellFormatter !== undefined) {
      value = col.cellFormatter(rowData[colKey].val);
    } else {
      value = rowData[colKey].val;
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
