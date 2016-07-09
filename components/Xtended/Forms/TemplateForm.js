import React, { Component } from "react";
import { reduxForm } from "redux-form";
import { FormButton } from "components";
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
  fields      : React.PropTypes.object.isRequired,
  submitForm  : React.PropTypes.func.isRequired,
  resetForm   : React.PropTypes.func.isRequired,
  values      : React.PropTypes.object,
  toggleModal : React.PropTypes.func,
};

export default reduxForm({
  form   : "createTemplate",
  fields : ["templateName", "workBook"],
})(CreateTemplateForm);
