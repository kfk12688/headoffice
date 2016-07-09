import React, { Component } from "react";
import { Button, Modal, PopupButton, Divider, PopupTextBox } from "components";
import CreateTemplateForm from "../Forms/TemplateForm";
import cx from "classnames";
import styles from "./ContentMenu.less";

class ContentMenu extends Component {
  constructor(props) {
    super(props);
    this.state = { showModal : false };
    this.toggleModal = this.toggleModal.bind(this);
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
      countItems,
      colSortItems,
      sortKey,
      actionsMenu,
      selectAllRows,
      clearRowSelection,
      addNewTemplate,
    } = this.props;

    let actionsMenuContent = null;
    if (countItems !== 0) {
      actionsMenuContent = (
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
            caption="Add New Content"
            faName="plus"
            accent
          >
            <CreateTemplateForm submitForm={addNewTemplate} toggleModal={this.toggleModal}/>
          </Modal>

          <PopupButton label={`${countItems} selected`}>
            <div onClick={selectAllRows}>Select All</div>
            <div onClick={clearRowSelection}>Clear selection</div>
          </PopupButton>
        </span>

          {actionsMenuContent}
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
