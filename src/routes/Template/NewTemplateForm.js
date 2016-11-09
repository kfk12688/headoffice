import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { Button, TextInput, ComboSearchInput } from "components";
import { searchWorkbook as loadWorkbooks } from "dataflow/api";
import styles from "./NewTemplateForm.less";

// FORM COMPONENT FOR Creating a new template
class CreateForm extends Component {
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
    this.props.toggleModal();
  }

  render() {
    const {pristine, submitting } = this.props;

    return (
      <form onSubmit={this.onSubmit}>
        <div className={styles.formElement}>
          <div className={styles.formElementTitle}>Enter the name of the template:</div>
          <Field className={styles.formElementInput} name="templateName" component={TextInput}/>
        </div>

        <div className={styles.formElement}>
          <div className={styles.formElementTitle}>Workbook</div>
          <Field className={styles.formElementInput} name="workBookId" component={ComboSearchInput}
                 loadOptions={loadWorkbooks}
          />
        </div>

        <div className={styles.addContentBtnGroup}>
          <Button style="success" disabled={pristine || submitting} type="submit">Save</Button>
          <Button onClick={this.resetForm}>Cancel</Button>
        </div>
      </form>
    );
  }
}

CreateForm.propTypes = {
  // redux-form injected props
  pristine     : React.PropTypes.bool,
  submitting   : React.PropTypes.bool,
  handleSubmit : React.PropTypes.func.isRequired,
  reset        : React.PropTypes.func.isRequired,

  toggleModal : React.PropTypes.func,
};

export default reduxForm({
  form : "newTemplate",
})(CreateForm);
