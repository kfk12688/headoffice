import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { Button, TextInput, NumericInput, ComboInput } from "components";
import styles from "./NewUserForm.less";

class CreateUserForm extends Component {
  constructor() {
    super();
    this.onSubmit = this.onSubmit.bind(this);
    this.resetForm = this.resetForm.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();
    this.props.handleSubmit();
    this.props.reset();
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
          <div className={styles.formElementTitle}>Enter a user name:</div>
          <Field
            name="username"
            className={styles.formElementInput}
            component={TextInput}
          />
        </div>

        <div className={styles.formElement} style={{ float : "left", width : "48%" }}>
          <div className={styles.formElementTitle}>First name :</div>
          <Field
            name="firstName"
            className={styles.formElementInput}
            component={TextInput}
          />
        </div>

        <div className={styles.formElement} style={{ float : "right", width : "48%" }}>
          <div className={styles.formElementTitle}>Last name :</div>
          <Field
            name="lastName"
            className={styles.formElementInput}
            component={TextInput}
          />
        </div>

        <div className={styles.formElement}>
          <div className={styles.formElementTitle}>Enter the role of the user:</div>

          <Field
            name="role"
            className={styles.formElementInput}
            component={ComboInput}
            list={["", "SuperAdmin", "Admin", "Manager", "Technician"]}
          />
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
          <Button bordered onClick={this.resetForm}>Cancel</Button>
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
  form : "newUser",
})(CreateUserForm);
