import React from "react";
import styles from "./common.less";

export const TextBox = ({ title, field }) =>
  <div className={styles.textbox}>
    <span className={styles.textboxTitle}>{title}</span>
    <input
      type="text"
      className={styles.textboxInput}
      {...field}
    />
  </div>;

TextBox.propTypes = {
  title : React.PropTypes.string,
  field : React.PropTypes.object,
};
