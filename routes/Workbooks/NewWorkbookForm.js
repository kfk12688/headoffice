import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import { Button, TextInput } from "components";
import "../../styles/Select.css";
import cx from "classnames";
import styles from "./NewWorkbookForm.less";

class CreateUserForm extends Component {
  constructor() {
    super();
    this.onSubmit = this.onSubmit.bind(this);
    this.resetForm = this.resetForm.bind(this);
  }

  onSubmit(e) {
    const { workbookName, users } = this.props.values;

    e.preventDefault();
    // this.props.submitForm({
    //   name : workbookName,
    //   // users : users,
    // });
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
            name="workbookName"
            className={styles.formElementInput}
            component={TextInput}
          />
        </div>

        <div className={styles.formElement}>
          <div className={styles.formElementTitle}>Select the users who will have access to the workbook/collection:
          </div>

          <Field
            name="users"
            className={cx(styles.formElementInput, styles.selectElement)}
            component="select"
          >
            <option value=""></option>
            <option value="SuperAdmin">SuperAdmin</option>
            <option value="Admin">Admin</option>
            <option value="Manager">Manager</option>
            <option value="Technician">Technician</option>
          </Field>
        </div>

        <div className={styles.addContentBtnGroup}>
          <Button accent="green" type="submit" disabled={pristine || submitting}>Save</Button>
          <Button onClick={this.resetForm}>Cancel</Button>
        </div>
      </form>
    );
  }
}

CreateUserForm.propTypes = {
  submitForm  : React.PropTypes.func.isRequired,
  reset       : React.PropTypes.func.isRequired,
  values      : React.PropTypes.object,
  toggleModal : React.PropTypes.func,
  state       : React.PropTypes.any,
};

export default reduxForm({
  form : "newWorkBook",
})(CreateUserForm);
