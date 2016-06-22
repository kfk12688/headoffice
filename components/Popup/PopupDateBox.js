/**
 * Created by sharavan on 21/05/16.
 */
import React from "react";
import styles from "./PopupDateBox.less";

const PopupDateBox = ({ value, onChangeHandler }) =>
  <div className={styles.base}>
    <input
      type="date"
      className={styles.input}
      value={value}
      onChange={onChangeHandler}
    />
  </div>;

export { PopupDateBox };
