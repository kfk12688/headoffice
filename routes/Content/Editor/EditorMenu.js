/**
 * Created by sharavan on 16/06/16.
 */
import React from "react";
import { Button } from "components";
import cx from "classnames";
import styles from "./EditorMenu.less";

const EditorMenu = ({ className, store, toggleSidebar }) => {
  return (
    <div
      className={cx(styles.root, className)}
    >
      <div className={styles.left}>
        <span>
          <Button
            faName="sliders"
            onClick={toggleSidebar}
            className={cx(styles.icon, { [styles.iconActive]: store.showSidebar })}
          />
        </span>
      </div>

      <div className={styles.right}>
      </div>
    </div>
  );
};

export { EditorMenu };
