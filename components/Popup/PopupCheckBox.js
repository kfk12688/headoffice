import React from "react";
import styles from "./PopupCheckBox.less";

const PopupCheckBox = ({ value, onChangeHandler }) =>
  <input
    className={styles.input}
    type="checkbox"
    checked={value}
    onChange={onChangeHandler}
  />;

export { PopupCheckBox };
