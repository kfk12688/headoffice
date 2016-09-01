import React, { Component } from "react";
import _ from "underscore";
import { FormButton } from "components";
import reduxForm from "../../lib/ReduxForm";
import getInputElement from "../../lib/FormGeneratorFactory";
import styles from "./EGForm.less";

class EditorEntryForm extends Component {
  constructor(props) {
    super(props);
    this.embeddedFields = [];
    this.state = {
      showSubSchema : false,
    };

    this.submitForm = this.submitForm.bind(this);
    this.resetForm = this.resetForm.bind(this);
    this.toggleSubSchemaEditor = this.toggleSubSchemaEditor.bind(this);
    this.generateFormFields = this.generateFormFields.bind(this);
    this.generateEmbeddedFields = this.generateEmbeddedFields.bind(this);
  }

  _getElement(type, col, field) {
    return (
      <div className={styles.inputRow}>
        <span className={styles.inputTitle}>{col.displayText} :</span>
        {getInputElement(type, col, field)}
      </div>
    );
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

  toggleSubSchemaEditor() {
    this.setState({
      showSubSchema : !this.state.showSubSchema,
    });
  }

  generateEmbeddedFields(fieldSchema, fields, col) {
    const { fieldName } = col;
    _.forEach(fieldSchema, subCol => {
      const nrmType = subCol.fieldType.trim().toLowerCase();
      const subFieldName = subCol.fieldName;
      const field = fields[fieldName][subFieldName];

      this.embeddedFields.push(this._getElement(nrmType, subCol, field));
    });
  }

  generateFormFields() {
    const { cols, fields } = this.props;
    const formFields = [];

    _.forEach(cols, col => {
      let { insertable : isFormInputNeeded } = col;
      isFormInputNeeded = (isFormInputNeeded === undefined) ? true : isFormInputNeeded;

      if (isFormInputNeeded) {
        const { fieldSchema, fieldName } = col;
        const nrmType = col.fieldType.trim().toLowerCase();
        const field = fields[fieldName];

        if (Array.isArray(fieldSchema) && (fieldSchema.length !== 0)) {
          formFields.push(
            <div className={styles.inputTableRow}>
              <span className={styles.inputTitle}>{col.displayText} :</span>
              <a
                style={{ fontSize : 12 }}
                href="#"
                onClick={this.toggleSubSchemaEditor}
                title="Click to open the Sub-Editor"
              >
                Open Sub-Editor
              </a>
            </div>
          );
        } else {
          formFields.push(this._getElement(nrmType, col, field));
        }
      }
    });

    return formFields;
  }

  render() {
    const { editorState, className } = this.props;
    const fieldInputs = this.generateFormFields();

    const subSchemaEditorStyle = {
      width : this.state.showSubSchema && "55%",
    };

    return (
      <form className={className} onSubmit={this.submitForm}>

        {fieldInputs.formFields}

        <div className={styles.subSchema} style={subSchemaEditorStyle}>
          <div className={styles.tabIcons}>
            <i onClick={this.toggleSubSchemaEditor} className="fa fa-columns"></i>
          </div>
          {
            this.state.showSubSchema &&
            <div className={styles.subSchemaFields}>
              <div className={styles.subSchemaFieldsTitle}>Adding data for Items</div>
              {fieldInputs.embeddedFields}
            </div>
          }
        </div>

        <div className={styles.formSubmitGroup}>
          <FormButton accent type="submit">{editorState ? "Add" : "Edit"}</FormButton>
          <FormButton onClick={this.resetForm}>Cancel</FormButton>
        </div>
      </form>
    );
  }
}

EditorEntryForm.propTypes = {
  className     : React.PropTypes.string,
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
