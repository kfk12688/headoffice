import React, { Component } from "react";
import { connect } from "react-redux";
import { reduxForm, Field, formValueSelector } from "redux-form";
import { Button, TextInput, CheckBoxInput, NumericInput, ComboInput, DateInput } from "components";
import styles from "./SDForm.less";

const Row = ({ children }) =>
  <div style={{ marginBottom : 5 }}>{children}</div>;
Row.propTypes = {
  children : React.PropTypes.node,
};

class EditorEntryForm extends Component {
  constructor(props) {
    super(props);
    this.submitForm = this.submitForm.bind(this);
    this.resetForm = this.resetForm.bind(this);
  }

  getFieldProps(fieldType, fields) {
    let formElements = [
      <Row key="1">
        <span className={styles.key}>Is Required</span>
        <CheckBoxInput field={fields.required}/>
      </Row>,
      <Row key="2">
        <span className={styles.key}>Is Unique</span>
        <CheckBoxInput field={fields.unique}/>
      </Row>,
      <Row key="3">
        <span className={styles.key}>Default values</span>
        <TextInput field={fields.default}/>
      </Row>,
    ];

    if (fieldType === "String") {
      formElements = [
        ...formElements,
        <Row key="4">
          <span className={styles.key}>Enum values</span>
          <TextInput field={fields.enum}/>
        </Row>,
      ];
    }

    if (fieldType === "Number") {
      formElements = [
        ...formElements,
        <Row key="5">
          <span className={styles.key}>Min value</span>
          <NumericInput field={fields.min}/>
        </Row>,
        <Row key="6">
          <span className={styles.key}>Max value</span>
          <NumericInput field={fields.max}/>
        </Row>,
      ];
    }

    if (fieldType === "Reference") {
      formElements = [
        ...formElements,
        <Row key="7">
          <span className={styles.key}>Specify Object Ref</span>
          <TextInput field={fields.ref}/>
        </Row>,
      ];
    }

    return formElements;
  }

  submitForm(e) {
    e.preventDefault();

    const { values : { fieldName, fieldType, ...rest } } = this.props;
    this.props.submitForm({
      fieldName,
      fieldType,
      fieldProps : { ...rest },
    });
    this.props.resetForm();
  }

  resetForm(e) {
    e.preventDefault();
    this.props.clearEditFlag();
    this.props.resetForm();
  }

  render() {
    const { fields, editorState } = this.props;
    const fieldType = fields.fieldType.value;

    return (
      <form onSubmit={this.submitForm}>

        <div className={styles.fields}>
          <div className={styles.fieldsTitle}>Fields</div>

          <div>

            <Row key="s1">
              <span className={styles.key}>Field Name :</span>
              <TextInput field={fields.fieldName}/>
            </Row>

            <Row key="s2">
              <span className={styles.key}>Field Type :</span>
              <ComboInput
                matchParentWidth
                field={fields.fieldType}
                list={["Number", "Date", "String", "Boolean", "Reference"]}
              />
            </Row>
          </div>
        </div>

        <div className={styles.defn}>
          <div className={styles.defnTitle}>Definition</div>
          <div>
            {this.getFieldProps(fieldType, fields)}
          </div>
        </div>

        <div className={styles.formSubmitGroup}>
          <Button accent type="submit" disabled={pristine || submitting}>{editorState ? "Add" : "Edit"}</Button>
          <Button onClick={this.resetForm}>Cancel</Button>
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

export default reduxForm({
  fields : [
    "fieldName", "fieldType", "default", "required",
    "unique", "enum", "min", "max", "ref",
  ],
})(EditorEntryForm);
