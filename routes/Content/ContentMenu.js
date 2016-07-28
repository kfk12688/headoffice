import React, { Component } from "react";
import { Button, Modal, PopupButton, Divider, PopupTextBox } from "components";
import CreateTemplateForm from "./TemplateForm";
import cx from "classnames";
import styles from "./ContentMenu.less";

class ContentMenu extends Component {
  constructor(props) {
    super(props);
    this.state = { showModal : false };
    this.toggleModal = this.toggleModal.bind(this);
    this.deleteTemplatesAction = this.deleteTemplatesAction.bind(this);
  }

  getActions() {
    const { selectedKeys, deleteTemplate } = this.props;

    let actionsMenuContent = null;
    if (selectedKeys.length !== 0) {
      actionsMenuContent = (
        <span>
          <Divider vertical size={{ h: 24, w: 1 }} style={{ marginRight: 5 }}/>
          <PopupButton label="Actions">
            <div>Edit Template</div>
            <div>Tag Template</div>
            <div>Set Permissions</div>
            <div onClick={this.deleteTemplatesAction}>Delete</div>
          </PopupButton>
        </span>
      );
    }

    return actionsMenuContent;
  }

  toggleModal() {
    if (this.state.showModal) {
      this.setState({ showModal : false });
    } else {
      this.setState({ showModal : true });
    }
  }

  deleteTemplatesAction() {
    const { deleteTemplate, selectedKeys } = this.props;
    selectedKeys.map(key => deleteTemplate({ id : key }));
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
      addNewTemplate,
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
            caption="Add New Content"
            faName="plus"
            accent
          >
            <CreateTemplateForm submitForm={addNewTemplate} toggleModal={this.toggleModal}/>
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
