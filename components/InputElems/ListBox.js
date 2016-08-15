import React from "react";
import styles from "./common.less";

export const ListBox = ({ title, field, options }) => {
  const opts = options.map(opt => <option key={opt.id} value={opt.id}>{opt.label}</option>);
  opts.unshift(<option key="-1" value=""></option>);

  return (
    <div className={styles.listbox}>
      <span className={styles.listboxTitle}>{title}</span>
      <select
        className={styles.listboxSelect}
        {...field}
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
