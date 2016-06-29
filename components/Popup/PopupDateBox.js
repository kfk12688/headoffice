/**
 * Created by sharavan on 21/05/16.
 */
import React from "react";
import moment from "moment";
import styles from "./PopupDateBox.less";

const PopupDateBox = ({ value, onChangeHandler }) => {
  let frmtDate = "";

  if ((value !== undefined) && value.isValid()) {
    frmtDate = moment(value).format("YYYY-MM-DD");
  }

  return (
    <div className={styles.base}>
      <input
        type="date"
        className={styles.input}
        value={frmtDate}
        onChange={onChangeHandler}
      />
    </div>
  );
};

export { PopupDateBox };
