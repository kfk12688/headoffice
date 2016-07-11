import React, { Component } from "react";
import { reduxForm } from "redux-form";
import { TextBox } from "./TextBox";
import { ListBox } from "./ListBox";
import { RefBox } from "./RefBox";
import { DateBox } from "./DateBox";
import { FormButton } from "../Button";
import styles from "./common.less";

function getForm(cols, fields) {
  function getInputElement(type, col, field) {
    const { displayText : title } = col;

    if (type === "list") {
      const { source : options } = col;

      return React.createElement(ListBox, {
        title,
        options,
        field,
      });
    }
    if (type === "reference") {
      const { refTableSource : tableOptions, refFieldSource : fieldOptions } = col;

      return React.createElement(RefBox, {
        title,
        tableOptions,
        fieldOptions,
        field,
      });
    }
    if (type === "date") {
      return React.createElement(DateBox, {
        title,
        field,
      });
    }

    return React.createElement(TextBox, {
      title,
      field,
    });
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
    this.onSubmit = this.onSubmit.bind(this);
    this.resetForm = this.resetForm.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();
    this.props.postHandler(this.props.values);
  }

  resetForm(e) {
    e.preventDefault();
    this.props.resetForm();
  }

  render() {
    const { cols, fields } = this.props;

    return (
      <form onSubmit={this.onSubmit}>
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
  fields : React.PropTypes.object.isRequired,
  cols   : React.PropTypes.object.isRequired,
  // submitForm : React.PropTypes.func.isRequired,
  resetForm  : React.PropTypes.func.isRequired,
  values : React.PropTypes.object,
  state: React.PropTypes.string,
};

export default reduxForm({
  form : "editorEntryForm",
})(EditorEntryForm);
