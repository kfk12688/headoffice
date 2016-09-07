import React, { Component } from "react";
import { Button, PopupButton, ComboInput } from "components";
import cx from "classnames";
import styles from "./Menu.less";

class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = { showModal : false };
    this.toggleModal = this.toggleModal.bind(this);
    this.selectAllHandler = this.selectAllHandler.bind(this);
  }

  getActions() {
    const { actions } = this.props;
    const actionsMenuContent = actions.map(action => {
      const key = action.name.replace(/ /, "").toLowerCase();
      return <div key={key} onClick={action.handler}>{action.name}</div>;
    });

    return (
      <span>
        <span className={styles.actionsSeperator}/>
        <PopupButton label="Actions">
          {actionsMenuContent}
        </PopupButton>
      </span>
    );
  }

  toggleModal() {
    if (this.state.showModal) {
      this.setState({ showModal : false });
    } else {
      this.setState({ showModal : true });
    }
  }

  selectAllHandler() {
    this.props.selectAllRows(this.props.keys);
  }

  render() {
    const {
      className, toggleSidebar, colSortItems, sortKey, actionsMenu,
      clearRowSelection, addTemplate, colSortFunction
    } = this.props;

    return (
      <div
        className={cx(styles.root, className)}
      >
        <div className={styles.left}>
          <span>
            <Button
              faName="sliders"
              onClick={toggleSidebar}
              className={cx(styles.icon, { [styles.iconActive] : actionsMenu.showSidebar })}
            />

            <PopupButton label={`${actionsMenu.selectedKeys.length} selected`}>
              <div onClick={this.selectAllHandler}>Select All</div>
              <div onClick={clearRowSelection}>Clear selection</div>
            </PopupButton>
          </span>

          {(actionsMenu.selectedKeys.length >= 1) && this.getActions()}
        </div>

        <div className={styles.right}>
          <span className={styles.sortTitle}>Sort by :</span>
          <ComboInput
            className={styles.sortList}
            label={sortKey}
            list={colSortItems}
            input={{
              value    : "",
              onChange : colSortFunction,
            }}
          />
        </div>
      </div>
    );
  }
}

export { Menu };
