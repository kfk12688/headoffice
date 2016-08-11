import React from "react";
import styles from "./common.less";

export const DateBox = ({ title, field }) => {
  const { onChange, value, ...rest } = field;
  const parse = event => ({ val : event.target.value });

  return (
    <div className={styles.datebox}>
      <span className={styles.dateboxTitle}>{title}</span>
      <input
        type="date"
        className={styles.dateboxInput}
        onChange={e => onChange(parse(e))}
        value={value.val || ""}
        {...rest}
      />
    </div>
  );
};

DateBox.propTypes = {
  title : React.PropTypes.string.isRequired,
  field : React.PropTypes.object,
};
