import React from "react";
import { ActionCell } from "./ActionCell";
import { CheckboxCell } from "./CheckboxCell";
import { FavoriteCell } from "./FavoriteCell";
import { LinkCell } from "./LinkCell";
import { ListCell } from "./ListCell";
import { NumberCell } from "./NumberCell";
import { RefCell } from "./RefCell";
import { TextCell } from "./TextCell";
import { DateCell } from "./DateCell";
import { ButtonCell } from "./ButtonCell";
import styles from "./common.less";

function getCell(transform, type, row, col) {
  if (type === "number") {
    return (<NumberCell value={transform()}/>);
  }
  if (type === "checkbox") {
    return (<CheckboxCell value={transform()}/>);
  }
  if (type === "favorite") {
    return (<FavoriteCell value={transform()}/>);
  }
  if (type === "list") {
    return (<ListCell value={transform()}/>);
  }
  if (type === "reference") {
    return (<RefCell
      value={{
        refTable : row.fieldReference && transform(row.fieldReference.tableName),
        refField : row.fieldReference && transform(row.fieldReference.fieldName),
      }}
    />);
  }
  if (type === "buttonLink") {
    const value = {
      text   : transform(),
      urlKey : row[col.linkRef.urlKey],
      path   : col.linkRef.path,
    };
    const { actions = [] } = col;
    const { buttonText, link } = col.button;

    return (
      <div className={styles.linkCellContainer}>
        <LinkCell className={styles.linkCellContainerLink_1} value={value}/>
        <ButtonCell
          className={styles.linkCellContainerButton}
          buttonText={buttonText}
          link={`${link.path}/${row[link.key]}`}
        />
        <ActionCell className={styles.linkCellContainerAction} actions={actions}/>
      </div>
    );
  }
  if (type === "link") {
    const value = {
      text   : transform(),
      urlKey : row[col.linkRef.urlKey],
      path   : col.linkRef.path,
    };
    const { actions = [] } = col;

    return (
      <div className={styles.linkCellContainer}>
        <LinkCell className={styles.linkCellContainerLink} value={value}/>
        <ActionCell className={styles.linkCellContainerAction} actions={actions}/>
      </div>
    );
  }
  if (type === "action") {
    return (<ActionCell data={row} actions={col.actions}/>);
  }
  if (type === "date") {
    return (<DateCell value={transform()}/>);
  }
  return (<TextCell value={transform()}/>);
}

export function renderDGCell(type, row, col) {
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

  return getCell(transform, type, row, col);
}

export function renderEGCell(type, row, col, colKey) {
  function transform() {
    let value = "";
    const isKeyPresent = row[colKey] !== undefined;
    const isKeyNull = row[colKey] === null;

    if (isKeyPresent) {
      if (isKeyNull) {
        value = "";
      } else if (col.cellFormatter !== undefined) {
        value = col.cellFormatter(row[colKey]);
      } else {
        value = row[colKey];
      }
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
export { DateCell } from "./DateCell";
export { ButtonCell } from "./ButtonCell";
