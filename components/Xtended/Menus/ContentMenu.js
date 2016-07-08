import React, { Component } from "react";
import { reduxForm } from "redux-form";
import { Button, FormButton, Modal, PopupButton, Divider, PopupTextBox } from "components";
import cx from "classnames";
import styles from "./ContentMenu.less";

// FORM COMPONENT FOR Creating a new template
class CreateTemplateForm extends Component {
  constructor() {
    super();
    this.onSubmit = this.onSubmit.bind(this);
    this.resetForm = this.resetForm.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();
    this.props.submitForm(this.props.values);
    this.props.toggleModal();
  }

  resetForm(e) {
    e.preventDefault();
    this.props.resetForm();
    this.props.toggleModal();
  }

  render() {
    const { fields : { templateName, workBook } } = this.props;

    return (
      <form onSubmit={this.onSubmit}>
        <div>
          <label>Enter the name of the template:</label>
          <input type="text" {...templateName} />
        </div>
        <div>Workgroup</div>
        <select {...workBook} value={workBook.value || ""}>
          <option></option>
          <option value="577138f0710ca6e422c2399e">What Workgroup ???</option>
        </select>
        <div className={styles.addContentBtnGroup}>
          <FormButton accent="green" type="submit">Save</FormButton>
          <FormButton onClick={this.resetForm}>Cancel</FormButton>
        </div>
      </form>
    );
  }
}

CreateTemplateForm.propTypes = {
  fields     : React.PropTypes.object.isRequired,
  submitForm : React.PropTypes.func.isRequired,
  resetForm  : React.PropTypes.func.isRequired,
  values     : React.PropTypes.object,
  toggleModal : React.PropTypes.func,
};

CreateTemplateForm = reduxForm({
  form   : "createTemplate",
  fields : ["templateName", "workBook"],
})(CreateTemplateForm);

// CONTENT MENU
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
