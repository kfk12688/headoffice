/**
 * Created by sharavan on 21/05/16.
 */
import React from "react";
import FontAwesome from "react-fontawesome";
import styles from "./SearchBox.less";

const SearchBox = ({ placeHolder, value, onChangeHandler }) => {
  if (typeof placeHolder === "boolean") {
    placeHolder = placeHolder ? "Search" : "";
  }

  return (
    <div className={styles.box}>
      <input
        className={styles.input}
        placeholder={placeHolder}
        value={value}
        onChange={onChangeHandler}
      />
      <FontAwesome
        className={styles.icon}
        name="search"
      />
    </div>
  );
};

export { SearchBox } ;

