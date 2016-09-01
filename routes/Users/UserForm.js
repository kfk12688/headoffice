import React, { Component } from "react";
import { Button, TextInput, NumericInput } from "components";
import "../../styles/Select.css";
import cx from "classnames";
import { Field, reduxForm } from "redux-form";
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
    console.log({
      name : userName,
      phoneNumber,
      role : userRole,
      password,
    });
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
          <div className={styles.formElementTitle}>Enter the name of the user:</div>
          <Field
            name="userName"
            className={styles.formElementInput}
            component={TextInput}
          />
        </div>

        <div className={styles.formElement}>
          <div className={styles.formElementTitle}>Enter the role of the user:</div>

          <Field
            name="userRole"
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

        <div className={styles.formElement}>
          <div className={styles.formElementTitle}>Enter the phone number of the user:</div>
          <Field
            name="phoneNumber"
            className={styles.formElementInput}
            component={NumericInput}
          />
        </div>

        <div className={styles.formElement}>
          <div className={styles.formElementTitle}>Enter user's mail id:</div>
          <Field
            name="emailId"
            className={styles.formElementInput}
            component="input"
            type="email"
          />
        </div>

        <div className={styles.formElement}>
          <div className={styles.formElementTitle}>Enter the user's password:</div>
          <Field
            name="password"
            className={styles.formElementInput}
            component="input"
            type="password"
          />
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
  fields       : React.PropTypes.object.isRequired,
  handleSubmit : React.PropTypes.func.isRequired,
  reset        : React.PropTypes.func.isRequired,
  values       : React.PropTypes.object,
  toggleModal  : React.PropTypes.func,
  state        : React.PropTypes.any,
};

export default reduxForm({
  form : "newUser",
})(CreateUserForm);
