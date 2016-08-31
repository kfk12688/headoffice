import React from "react";
import { ActionCell } from "./ActionCell";
import { CheckboxCell } from "./CheckboxCell";
import { FavoriteCell } from "./FavoriteCell";
import { LinkCell } from "./LinkCell";
import { NumberCell } from "./NumberCell";
import { TextCell } from "./TextCell";
import { ButtonCell } from "./ButtonCell";
import { LabelCell } from "./LabelCell";
import { DateCell } from "./DateCell";
import styles from "./common.less";

function getCell(transform, type, row, col) {
  if (type === "number") {
    return (<NumberCell value={transform()}/>);
  }
  if (type === "date") {
    return (<DateCell value={transform()}/>);
  }
  if (type === "checkbox") {
    return (<CheckboxCell value={transform()}/>);
  }
  if (type === "favorite") {
    return (<FavoriteCell value={transform()}/>);
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
      <div className={styles.linkCell}>
        <LinkCell className={styles.linkCellLink} value={value}/>
        <ButtonCell
          className={styles.linkCellAnchorButton}
          btnClassName={styles.linkCellAnchorButtonBtn}
          buttonText={buttonText}
          link={`${link.path}/${row[link.key]}`}
        />
        <ActionCell className={styles.linkCellAction} actions={actions}/>
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
      <div className={styles.linkCell}>
        <LinkCell className={styles.linkCellLink} value={value}/>
        <ActionCell className={styles.linkCellAction} actions={actions}/>
      </div>
    );
  }
  if (type === "action") {
    return (<ActionCell data={row} actions={col.actions}/>);
  }
  if (type === "label") {
    return (<LabelCell value={transform()}/>);
  }
  if (type === "join") {
    const values = [];
    const dataKeys = col.dataKey;
    dataKeys.forEach(k => {
      values.push(transform(k));
    });
    return (<TextCell value={values.reduce((ov, nv) => `${ov} ${nv}`)}/>);
  }
  return (<TextCell value={transform()}/>);
}

export function renderDGCell(type, row, col) {
  function transform(dataKey = col.dataKey) {
    const dataKeyParts = dataKey.split(".");
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

  const nrmType = type.trim().toLowerCase();
  return getCell(transform, nrmType, row, col);
}

export { FavoriteCell } from "./FavoriteCell";
