import React, { Component } from "react";
import { Button, Modal, PopupButton, Divider, PopupTextBox } from "components";
import UserForm from "./UserForm";
import cx from "classnames";
import styles from "./ContentMenu.less";

class ContentMenu extends Component {
  constructor(props) {
    super(props);
    this.state = { showModal : false };
    this.toggleModal = this.toggleModal.bind(this);
  }

  getActions() {
    const { selectedKeys } = this.props;
    let actionsMenuContent = null;

    if (selectedKeys.length !== 0) {
      actionsMenuContent = (
        <span>
          <Divider vertical size={{ h: 24, w: 1 }} style={{ marginRight: 5 }}/>
          <PopupButton label="Actions">
            <div>Edit User</div>
          </PopupButton>
        </span>
      );
    }

    return null;
  }

  toggleModal() {
    if (this.state.showModal) {
      this.setState({ showModal : false });
    } else {
      this.setState({ showModal : true });
    }
  }

  render() {
    const {
      className,
      toggleSidebar,
      colSortItems,
      selectedKeys,
      sortKey,
      actionsMenu,
      selectAllRows,
      clearRowSelection,
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
              className={cx(styles.icon, { [styles.iconActive]: actionsMenu.showSidebar })}
            />
            <Modal
              show={this.state.showModal}
              toggleModal={this.toggleModal}
              caption="Add New User"
              faName="plus"
              accent
            >
              <UserForm submitForm={() => {}} toggleModal={this.toggleModal}/>
            </Modal>
            <PopupButton label={`${selectedKeys.length} selected`}>
              <div onClick={selectAllRows}>Select All</div>
              <div onClick={clearRowSelection}>Clear selection</div>
            </PopupButton>
          </span>

          {this.getActions()}
        </div>

        <div className={styles.right}>
          <span>Sort by : </span>
          <span className={styles.sortBlock}>
            <PopupTextBox matchParentWidth label={sortKey}>
              {colSortItems}
            </PopupTextBox>
          </span>
        </div>
      </div>
    );
  }
}

export { ContentMenu };
