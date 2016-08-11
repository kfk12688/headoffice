import React, { Component } from "react";
import { TextBox } from "./TextBox";
import { ListBox } from "./ListBox";
import { DateBox } from "./DateBox";
import { RefBox } from "./RefBox";
import { FormButton } from "../Button";
import styles from "./common.less";
import reduxForm from "../../lib/FormWrapper";

function getForm(cols, fields) {
  function getInputElement(type, col, field) {
    const { displayText : title } = col;

    if (type === "list") {
      const { source : options } = col;

      return (
        <ListBox
          key={title}
          title={title}
          options={options}
          field={field}
        />
      );
    }
    if (type === "reference") {
      const { refTableSource : tableOptions, refFieldSource : fieldOptions } = col;

      return (
        <RefBox
          key={title}
          title={title}
          tableOptions={tableOptions}
          fieldOptions={fieldOptions}
          field={field}
        />
      );
    }
    if (type === "date") {
      return (
        <DateBox
          key={title}
          title={title}
          field={field}
        />
      );
    }

    return (
      <TextBox
        key={title}
        title={title}
        field={field}
      />
    );
  }

  const formFields = [];
  for (const colKey in cols) {
    const col = cols[colKey];
    const { renderType : type } = col;
    let { insertable : isFormInputNeeded } = col;
    isFormInputNeeded = (isFormInputNeeded === undefined) ? true : isFormInputNeeded;

    if (isFormInputNeeded) {
      formFields.push(getInputElement(type, col, fields[colKey]));
    }
  }

  return formFields;
}

// FORM COMPONENT FOR Creating a new template
class EditorEntryForm extends Component {
  constructor(props) {
    super(props);
    this.submitForm = this.submitForm.bind(this);
    this.resetForm = this.resetForm.bind(this);
  }

  submitForm(e) {
    e.preventDefault();
    this.props.submitForm(this.props.values);
  }

  resetForm(e) {
    e.preventDefault();
    this.props.clearEditFlag();
    this.props.resetForm();
  }

  render() {
    const { cols, fields } = this.props;

    return (
      <form onSubmit={this.submitForm}>

        {getForm(cols, fields)}

        <div className={styles.formSubmitGroup}>
          <FormButton accent type="submit">Add</FormButton>
          <FormButton onClick={this.resetForm}>Cancel</FormButton>
        </div>
      </form>
    );
  }
}

EditorEntryForm.propTypes = {
  fields        : React.PropTypes.object.isRequired,
  cols          : React.PropTypes.object.isRequired,
  values        : React.PropTypes.object.isRequired,
  submitForm    : React.PropTypes.func,
  resetForm     : React.PropTypes.func,
  clearEditFlag : React.PropTypes.func,
};

export default reduxForm()(EditorEntryForm);
