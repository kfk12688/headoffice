import React, { Component } from "react";
import { FormButton } from "components";
import FontAwesome from "react-fontawesome";
import "../../styles/Select.css";
import cx from "classnames";
import reduxForm from "../../lib/FormWrapper";
import styles from "./UserForm.less";

class CreateUserForm extends Component {
  constructor() {
    super();
    this.onSubmit = this.onSubmit.bind(this);
    this.resetForm = this.resetForm.bind(this);
  }

  onSubmit(e) {
    const { userName, userRole, phoneNumber, password } = this.props.values;

    e.preventDefault();
    this.props.submitForm({
      name : userName,
      phoneNumber,
      role : userRole,
      password,
    });
    this.props.toggleModal();
  }

  resetForm(e) {
    e.preventDefault();
    this.props.resetForm();
    this.props.toggleModal();
  }

  render() {
    const { fields : { userName, userRole, phoneNumber, emailId, password } } = this.props;

    return (
      <form onSubmit={this.onSubmit}>
        <div className={styles.formElement}>
          <div className={styles.formElementTitle}>Enter the name of the user:</div>
          <div>
            <input
              className={styles.formElementInput}
              type="text"
              {...userName}
            />
          </div>
        </div>

        <div className={styles.formElement}>
          <div className={styles.formElementTitle}>Enter the role of the user:</div>
          <div>
            <select
              className={cx(styles.formElementInput, styles.selectElement)}
              {...userRole}
              value={userRole.value || ""}
            >
              <option value=""></option>
              <option value="SuperAdmin">SuperAdmin</option>
              <option value="Admin">Admin</option>
              <option value="Manager">Manager</option>
              <option value="Technician">Technician</option>
            </select>
          </div>
        </div>

        <div className={styles.formElement}>
          <div className={styles.formElementTitle}>Enter the phone number of the user:</div>
          <div>
            <input
              className={styles.formElementInput}
              type="number"
              {...phoneNumber}
            />
          </div>
        </div>

        <div className={styles.formElement}>
          <div className={styles.formElementTitle}>Enter user's mail id:</div>
          <div>
            <input
              className={styles.formElementInput}
              type="email"
              {...emailId}
            />
          </div>
        </div>

        <div className={styles.formElement}>
          <div className={styles.formElementTitle}>Enter the user's password:</div>
          <div>
            <input
              className={styles.formElementInput}
              type="password"
              {...password}
            />
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
  fields : ["userName", "userRole", "phoneNumber", "emailId", "password"],
})(CreateUserForm);
