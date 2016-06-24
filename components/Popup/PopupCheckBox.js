import React from "react";
import styles from "./PopupCheckBox.less";

const PopupCheckBox = ({ value, onChangeHandler, className, children }) =>
  <div>
    <input
      className={styles.input}
      type="checkbox"
      checked={value}
      onChange={onChangeHandler}
    />
    <span className={className}>{children}</span>
  </div>;

export { PopupCheckBox };
