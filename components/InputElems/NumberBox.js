import React from "react";
import styles from "./common.less";

export const NumberBox = ({ title, field }) => {
  const { onChange, value, ...rest } = field;
  const parse = event => Number(event.target.value);

  return (
    <div className={styles.textbox}>
      <span className={styles.textboxTitle}>{title}</span>
      <input
        type="number"
        className={styles.textboxInput}
        onChange={e => onChange(parse(e))}
        value={value}
        {...rest}
      />
    </div>
  );
};

NumberBox.propTypes = {
  title : React.PropTypes.string,
  field : React.PropTypes.object,
};
