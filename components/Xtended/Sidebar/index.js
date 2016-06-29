/**
 * Created by sharavan on 15/05/16.
 */
import React from "react";
import { SearchBox } from "components";
import cx from "classnames";
import styles from "./Sidebar.less";

const Sidebar = ({ className }) => {
  return (
    <div className={ cx(styles.base, className) }>
      <div className={styles.searchbox}>
        <SearchBox />
      </div>
    </div>
  );
};

export { Sidebar };
