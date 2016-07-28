import React, { Component } from "react";
import { reduxForm } from "redux-form";
import { FormButton } from "components";
import FontAwesome from "react-fontawesome";
import Select from "react-select";
import "../../styles/Select.css";
import { searchWorkbook } from "../../dataflow/workbook/api";
import styles from "./UserForm.less";

const WorkbookSelect = ({ value, onChange, className }) =>
  <Select.Async
    className={className}
    onChange={onChange}
    value={value}
    valueKey="id"
    fieldKey="label"
    loadOptions={searchWorkbook}
    minimumInput={1}
  />;

// FORM COMPONENT FOR Creating a new template
class CreateUserForm extends Component {
  constructor() {
    super();
    this.onSubmit = this.onSubmit.bind(this);
    this.resetForm = this.resetForm.bind(this);
  }

  onSubmit(e) {
    const { values, state } = this.props;
    const { templateName, workBook } = values;
    const data = (state && ("data" in state)) ? state.data : null;

    e.preventDefault();
    this.props.submitForm({
      templateName,
      workBook : workBook.id,
      fields   : (data && data.fields) || [],
    });
    this.props.toggleModal();
  }

  resetForm(e) {
    e.preventDefault();
    this.props.resetForm();
    this.props.toggleModal();
  }

  render() {
    const { fields : { templateName, workBook }, submitting } = this.props;

    return (
      <form onSubmit={this.onSubmit}>
        <div className={styles.formElement}>
          <div className={styles.formElementTitle}>Enter the name of the template:</div>
          <div>
            <input
              className={styles.formElementInput}
              type="text"
              {...templateName}
            />
          </div>
        </div>

        <div className={styles.formElement}>
          <div className={styles.formElementTitle}>Workbook</div>
          <WorkbookSelect
            className={styles.formElementInput}
            {...workBook}
            value={workBook.value || ""}
          />
        </div>

        <div className={styles.addContentBtnGroup}>
          <FormButton accent="green" type="submit" disabled={submitting}>
            {submitting && <FontAwesome name="spinner" spin/>}
            Save
          </FormButton>
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
  form   : "createTemplate",
  fields : ["templateName", "workBook"],
})(CreateUserForm);
