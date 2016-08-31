import React, { Component } from "react";
import { FormButton } from "components";
import reduxForm from "../../lib/ReduxForm";
import getFormFields from "../../lib/FormGeneratorFactory";
import styles from "./EGForm.less";

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
    const { cols, fields, editorState } = this.props;

    return (
      <form onSubmit={this.submitForm}>

        {getFormFields(cols, fields)}

        <div className={styles.formSubmitGroup}>
          <FormButton accent type="submit">{editorState ? "Add" : "Edit"}</FormButton>
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
  // indicates the state of the form - whether edit/addition
  editorState   : React.PropTypes.bool,
};

export default reduxForm()(EditorEntryForm);
