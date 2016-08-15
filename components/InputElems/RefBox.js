import React from "react";
import styles from "./common.less";

export const RefBox = ({ title, tableOptions, fieldOptions, field }) => {
  const { tableName:tableField, colName:colField } = field;
  const parse = e => JSON.parse(e.target.value);

  const tableOpts = tableOptions.map(opt => <option key={opt.id} value={JSON.stringify(opt)}>{opt.label}</option>);
  tableOpts.unshift(<option key="-1" value=""></option>);

  const fieldOpts = fieldOptions.map(opt => <option key={opt.id} value={JSON.stringify(opt)}>{opt.label}</option>);
  fieldOpts.unshift(<option key="-1" value=""></option>);

  return (
    <div className={styles.refbox}>
      <span className={styles.refboxTitle}>{title}</span>

      <select
        className={styles.listboxSelect}
        onChange={e => tableField.onChange(parse(e))}
        value={JSON.stringify(tableField.value) || ""}
      >
        {tableOpts}
      </select>

      <select
        className={styles.listboxSelect}
        onChange={e => colField.onChange(parse(e))}
        value={JSON.stringify(colField.value) || ""}
      >
        {fieldOpts}
      </select>
    </div>
  );
};

RefBox.propTypes = {
  title        : React.PropTypes.string,
  field        : React.PropTypes.object,
  tableOptions : React.PropTypes.arrayOf(React.PropTypes.shape({
    id    : React.PropTypes.any,
    label : React.PropTypes.string,
  })),
  fieldOptions : React.PropTypes.arrayOf(React.PropTypes.shape({
    id    : React.PropTypes.any,
    label : React.PropTypes.string,
  })),
};
