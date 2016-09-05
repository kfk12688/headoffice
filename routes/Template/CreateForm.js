import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { Button, TextInput, ComboSearchInput } from "components";
import { searchWorkbook as loadWorkbooks } from "../../dataflow/workbooks/api";
import styles from "./CreateForm.less";

// FORM COMPONENT FOR Creating a new template
class CreateForm extends Component {
  constructor() {
    super();
    this.onSubmit = this.onSubmit.bind(this);
    this.resetForm = this.resetForm.bind(this);
  }

  onSubmit(values) {
    const { templateName, workbookName } = values;

    this.props.submitForm({
      templateName,
      workbookId : workbookName.id,
    });
    this.props.toggleModal();
  }

  resetForm(e) {
    e.preventDefault();
    this.props.reset();
    this.props.toggleModal();
  }

  render() {
    const { pristine, submitting, handleSubmit } = this.props;

    return (
      <form onSubmit={handleSubmit(this.onSubmit)}>
        <div className={styles.formElement}>
          <div className={styles.formElementTitle}>Enter the name of the template:</div>
          <Field className={styles.formElementInput} name="templateName" component={TextInput}/>
        </div>

        <div className={styles.formElement}>
          <div className={styles.formElementTitle}>Workbook</div>
          <Field className={styles.formElementInput} name="workbookName" component={ComboSearchInput}
                 loadOptions={loadWorkbooks}
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

CreateForm.propTypes = {
  handleSubmit : React.PropTypes.func.isRequired,
  reset        : React.PropTypes.func.isRequired,
  toggleModal  : React.PropTypes.func,
  state        : React.PropTypes.any,
};

export default reduxForm({
  form : "newTemplate",
})(CreateForm);
