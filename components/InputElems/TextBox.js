import React from "react";
import styles from "./common.less";

export const TextBox = ({ title, field }) => {
  const { onChange, value, ...rest } = field;
  const parse = event => ({ val : event.target.value });

  return (
    <div className={styles.textbox}>
      <span className={styles.textboxTitle}>{title}</span>
      <input
        type="text"
        className={styles.textboxInput}
        onChange={e => onChange(parse(e))}
        value={value.val || ""}
        {...rest}
      />
    </div>
  );
};

TextBox.propTypes = {
  title : React.PropTypes.string,
  field : React.PropTypes.object,
};
