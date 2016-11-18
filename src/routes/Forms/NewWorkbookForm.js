import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import { Button, TextInput, DropdownInput } from "components";
import styles from "./NewWorkbookForm.less";

class CreateUserForm extends Component {
  constructor() {
    super();
    this.onSubmit = this.onSubmit.bind(this);
    this.resetForm = this.resetForm.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();
    this.props.handleSubmit();
    this.props.toggleModal();
  }

  resetForm(e) {
    e.preventDefault();
    this.props.reset();
  }

  render() {
    const { pristine, submitting } = this.props;

    return (
      <form onSubmit={this.onSubmit}>
        <div className={styles.formElement}>
          <div className={styles.formElementTitle}>Enter the name of the workbook/collection:</div>
          <Field
            name="name"
            className={styles.formElementInput}
            component={TextInput}
          />
        </div>

        <div className={styles.formElement}>
          <div className={styles.formElementTitle}>Select the users who will have access to the workbook/collection:
          </div>
          <Field
            name="users"
            className={styles.formElementInput}
            component={DropdownInput}
            options={["", "SuperAdmin", "Admin", "Manager", "Technician"]}
          />
        </div>

        <div className={styles.addContentBtnGroup}>
          <Button style="success" type="submit" disabled={pristine || submitting}>Save</Button>
          <Button outline onClick={this.resetForm}>Cancel</Button>
        </div>
      </form>
    );
  }
}

CreateUserForm.propTypes = {
  // redux-form injected props
  pristine     : React.PropTypes.bool,
  submitting   : React.PropTypes.bool,
  handleSubmit : React.PropTypes.func.isRequired,
  reset        : React.PropTypes.func.isRequired,

  toggleModal : React.PropTypes.func,
};

export default reduxForm({
  form : "newWorkBook",
})(CreateUserForm);

