import React from "react";
import styles from "./common.less";

export const ListBox = ({ title, field, options }) => {
  const { onChange, onBlur, value, ...rest } = field;
  const parse = event => ({ val : JSON.parse(event.target.value) });

  const opts = options.map(opt => <option key={opt.id} value={JSON.stringify(opt)}>{opt.label}</option>);
  opts.unshift(<option key="-1" value=""></option>);

  return (
    <div className={styles.listbox}>
      <span className={styles.listboxTitle}>{title}</span>
      <select
        className={styles.listboxSelect}
        onChange={e => onChange(parse(e))}
        onBlur={e => onBlur(parse(e))}
        value={JSON.stringify(value.val) || ""}
        {...rest}
      >
        {opts}
      </select>
    </div>
  );
};

ListBox.propTypes = {
  title   : React.PropTypes.string,
  field   : React.PropTypes.object,
  options : React.PropTypes.arrayOf(React.PropTypes.shape({
    id    : React.PropTypes.any,
    label : React.PropTypes.string,
  })),
};
