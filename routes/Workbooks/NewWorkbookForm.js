import React, { Component } from "react";
import { FormButton } from "components";
import "../../styles/Select.css";
import cx from "classnames";
import reduxForm from "../../lib/FormWrapper";
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
    this.props.submitForm({
      name : workbookName,
      // users : users,
    });
    this.props.toggleModal();
  }

  resetForm(e) {
    e.preventDefault();
    this.props.resetForm();
    this.props.toggleModal();
  }

  render() {
    const { fields : { workbookName, users } } = this.props;

    return (
      <form onSubmit={this.onSubmit}>
        <div className={styles.formElement}>
          <div className={styles.formElementTitle}>Enter the name of the workbook/collection:</div>
          <div>
            <input
              className={styles.formElementInput}
              type="text"
              {...workbookName}
            />
          </div>
        </div>

        <div className={styles.formElement}>
          <div className={styles.formElementTitle}>Select the users who will have access to the workbook/collection:
          </div>
          <div>
            <select
              className={cx(styles.formElementInput, styles.selectElement)}
              {...users}
              value={users.value || ""}
            >
              <option value=""></option>
              <option value="SuperAdmin">SuperAdmin</option>
              <option value="Admin">Admin</option>
              <option value="Manager">Manager</option>
              <option value="Technician">Technician</option>
            </select>
          </div>
        </div>

        <div className={styles.addContentBtnGroup}>
          <FormButton accent="green" type="submit">Save</FormButton>
          <FormButton onClick={this.resetForm}>Cancel</FormButton>
        </div>
      </form>
    );
  }
}

CreateUserForm.propTypes = {
  fields      : React.PropTypes.object.isRequired,
  submitForm  : React.PropTypes.func.isRequired,
  resetForm   : React.PropTypes.func.isRequired,
  values      : React.PropTypes.object,
  toggleModal : React.PropTypes.func,
  state       : React.PropTypes.any,
};

export default reduxForm({
  fields : ["workbookName", "users"],
})(CreateUserForm);
