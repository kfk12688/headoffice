/**
 * Created by sharavan on 02/06/16.
 */
import React from "react";
import styles from "./FormFieldFactory.less";

export default class FormFieldFactory {
  getElement(renderType: string) {
    switch (renderType) {
      case "number":
      case "date":
        return this.NumericCell;
      case "list":
        return this.ListCell;
      case "reference":
        return this.ReferenceCell;
      default:
      case "text":
        return this.TextCell;
    }
  }

  TextCell(props) {
    const { caption, data, cb } = props;
    const value = (data === undefined) ? "" : data;

    return (
      <div className={styles.base}>
        <div className={styles.caption}>{caption} : </div>
        <div className={styles.field}><input type="text" value={value} onChange={cb} /></div>
      </div>
    );
  }

  NumericCell(props) {
    const { caption, data, cb } = props;
    const value = (data === undefined) ? "" : data;

    return (
      <div className={styles.base}>
        <div className={styles.caption}>{caption} : </div>
        <div className={styles.field}>
          <input type="number" value={value} onChange={cb} />
        </div>
      </div>
    );
  }

  ReferenceCell(props) {
    const { caption, source, cb, data } = props;
    const valueRefTable = (data === undefined) ? "" : data.refTable.key;
    const valueRefField = (data === undefined) ? "" : data.refField.key;

    const refTableOptions = source.refTableSource.map(o => {
      return <option key={o.key} value={o.key}>{o.val}</option>;
    });
    refTableOptions.unshift(<option key="-1" value=""></option>);

    const refFieldOptions = source.refFieldSource.map(o => {
      return <option key={o.key} value={o.key}>{o.val}</option>;
    });
    refFieldOptions.unshift(<option key="-1" value=""></option>);

    return (
      <div className={styles.base}>
        <div className={styles.caption}>{caption} : </div>
        <div className={styles.field}>
          <select onSelect={cb} value={valueRefTable}>{refTableOptions}</select>
        </div>
        <div className={styles.field}>
          <select onSelect={cb} value={valueRefField}>{refFieldOptions}</select>
        </div>
      </div>
    );
  }

  ListCell(props) {
    const { caption, source, cb, data } = props;
    const value = (data === undefined) ? "" : data.key;

    const options = source.refList.map(o => {
      return <option key={o.key} value={o.key}>{o.val}</option>;
    });
    options.unshift(<option key="-1" value=""></option>);

    return (
      <div className={styles.base}>
        <div className={styles.caption}>{caption} : </div>
        <div className={styles.field}>
          <select onSelect={cb} value={value}>{options}</select>
        </div>
      </div>
    );
  }
}
