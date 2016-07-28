import React from "react";
import styles from "./common.less";

export const RefBox = ({ title, tableOptions, fieldOptions, field }) => {
  const { tableName:tableField, colName:colField } = field;
  const { onChange:_1, onBlur:_2, value:_3, ...restValueTable } = tableField;
  const { onChange:_4, onBlur:_5, value:_6, ...restValueField } = colField;
  const parse = event => ({ val : JSON.parse(event.target.value) });

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
        onBlur={e => tableField.onBlur(parse(e))}
        value={JSON.stringify(tableField.value.val) || ""}
        {...restValueTable}
      >
        {tableOpts}
      </select>

      <select
        className={styles.listboxSelect}
        onChange={e => colField.onChange(parse(e))}
        onBlur={e => colField.onBlur(parse(e))}
        value={JSON.stringify(colField.value.val) || ""}
        {...restValueField}
      >
        {fieldOpts}
      </select>
    </div>
  );
};

RefBox.propTypes = {
  title        : React.PropTypes.string,
  field        : React.PropTypes.any.isRequired,
  tableOptions : React.PropTypes.arrayOf(React.PropTypes.shape({
    id    : React.PropTypes.any,
    label : React.PropTypes.string,
  })),
  fieldOptions : React.PropTypes.arrayOf(React.PropTypes.shape({
    id    : React.PropTypes.any,
    label : React.PropTypes.string,
  })),
};
