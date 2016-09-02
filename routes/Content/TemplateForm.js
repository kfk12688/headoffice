import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { Button, TextInput } from "components";
import "../../styles/Select.css";
import { searchWorkbook } from "../../dataflow/workbooks/api";
import reduxForm from "../../lib/ReduxForm";
import styles from "./TemplateForm.less";

const WorkbookSelect = ({ value, onChange, className }) =>
  <Select.Async
    className={className}
    onChange={onChange}
    value={value}
    valueKey="id"
    fieldKey="label"
    loadOptions={searchWorkbook}
  />;

// FORM COMPONENT FOR Creating a new template
class CreateTemplateForm extends Component {
  constructor() {
    super();
    this.onSubmit = this.onSubmit.bind(this);
    this.resetForm = this.resetForm.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();
    const { templateName, workBook } = this.props.values;

    // console.log({
    //   id         : id,
    //   templateName,
    //   workBookId : workBook.id,
    // });

    this.props.submitForm({
      templateName,
      workBookId : workBook.id,
    });
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
        <div className={styles.formElement}>
          <div className={styles.formElementTitle}>Enter the name of the template:</div>
          <input className={styles.formElementInput} type="text" {...templateName}/>
        </div>

        <div className={styles.formElement}>
          <div className={styles.formElementTitle}>Workbook</div>
          <WorkbookSelect {...workBook}/>
        </div>

        <div className={styles.addContentBtnGroup}>
          <Button accent="green" type="submit" disabled={pristine || submitting}>Save</Button>
          <Button onClick={this.resetForm}>Cancel</Button>
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
  state       : React.PropTypes.any,
};

export default reduxForm({
  fields : ["templateName", "workBook"],
})(CreateTemplateForm);
