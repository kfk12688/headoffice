/**
 * Created by sharavan on 16/06/16.
 */
import React from "react";
import { Button, PopupButton, Divider, PopupTextBox } from "../../components/index";
import cx from "classnames";
import styles from "./ContextMenu.less";

const ContextMenu = (props) => {
  let actionsMenu = undefined;

  if (props.countItems !== 0) {
    actionsMenu = (
      <span>
        <Divider vertical size={{ h: 24, w: 1 }} style={{ marginRight: 5 }}/>
        <PopupButton label="Actions">
          <div>Edit Template</div>
          <div>Tag...</div>
          <div>Set Permissions</div>
        </PopupButton>
      </span>
    );
  }

  return (
    <div
      fullWidth
      className={cx(styles.root, props.className)}
    >
      <div className={styles.left}>
        <span>
          <Button
            faName="sliders"
            onClick={props.toggleSidebar}
            className={cx(styles.icon, { [styles.iconActive]: props.actionsMenu.showSidebar })}
          />

          <PopupButton label={props.countItems + " selected"}>
            <div onClick={props.selectAllRows}>Select All</div>
            <div onClick={props.clearRowSelection}>Clear selection</div>
          </PopupButton>
        </span>

        {actionsMenu}
      </div>

      <div className={styles.right}>
        <span>Sort by : </span>
        <span className={styles.sortBlock}>
          <PopupTextBox matchParentWidth label={props.sortKey}>
            {props.colSortItems}
          </PopupTextBox>
        </span>
      </div>
    </div>
  );
};

export { ContextMenu };
