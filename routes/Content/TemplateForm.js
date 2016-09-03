import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { Button, TextInput } from "components";
import "../../styles/Select.css";
import styles from "./TemplateForm.less";

// FORM COMPONENT FOR Creating a new template
class CreateTemplateForm extends Component {
  constructor() {
    super();
    this.onSubmit = this.onSubmit.bind(this);
    this.resetForm = this.resetForm.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();
    // const { templateName, workBook } = this.props.values;

    // console.log({
    //   id         : id,
    //   templateName,
    //   workBookId : workBook.id,
    // });

    // this.props.handleSubmit({
    //   templateName,
    //   workBookId : workBook.id,
    // });
    this.props.toggleModal();
  }

  resetForm(e) {
    e.preventDefault();
    this.props.reset();
    this.props.toggleModal();
  }

  render() {
    const { pristine, submitting } = this.props;

    return (
      <form onSubmit={this.onSubmit}>
        <div className={styles.formElement}>
          <div className={styles.formElementTitle}>Enter the name of the template:</div>
          <Field className={styles.formElementInput} name="templateName" component={TextInput}/>
        </div>

        <div className={styles.formElement}>
          <div className={styles.formElementTitle}>Workbook</div>
        </div>

        <div className={styles.addContentBtnGroup}>
          <Button accent="green" type="submit" disabled={pristine || submitting}>Save</Button>
          <Button bordered onClick={this.resetForm}>Cancel</Button>
        </div>
      </form>
    );
  }
}

CreateTemplateForm.propTypes = {
  handleSubmit : React.PropTypes.func.isRequired,
  reset        : React.PropTypes.func.isRequired,
  toggleModal  : React.PropTypes.func,
  state        : React.PropTypes.any,
};

export default reduxForm({
  form : "newTemplate",
})(CreateTemplateForm);
