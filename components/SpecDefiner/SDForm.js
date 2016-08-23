import React, { Component } from "react";
import { FormButton, TextInput, StaticListInput, CheckBoxInput, NumericInput } from "components";
import reduxForm from "../../lib/ReduxForm";
import styles from "./SDForm.less";

const Row = ({ children }) =>
  <div style={{ display : "table-row", height : 21 }}>
    {children}
  </div>;
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
        <div className={styles.key}>Is Required</div>
        <CheckBoxInput field={fields.required}/>
      </Row>,
      <Row key="2">
        <div className={styles.key}>Is Unique</div>
        <CheckBoxInput field={fields.unique}/>
      </Row>,
      <Row key="3">
        <div className={styles.key}>Default values</div>
        <TextInput field={fields.default}/>
      </Row>,
    ];

    if (fieldType === "String") {
      formElements = [
        ...formElements,
        <Row key="4">
          <div className={styles.key}>Enum values</div>
          <TextInput field={fields.enum}/>
        </Row>,
      ];
    }

    if (fieldType === "Number") {
      formElements = [
        ...formElements,
        <Row key="5">
          <div className={styles.key}>Min value</div>
          <NumericInput field={fields.min}/>
        </Row>,
        <Row key="6">
          <div className={styles.key}>Max value</div>
          <NumericInput field={fields.max}/>
        </Row>,
      ];
    }

    if (fieldType === "Reference") {
      formElements = [
        ...formElements,
        <Row key="7">
          <div className={styles.key}>Specify Object Ref</div>
          <TextInput field={fields.ref}/>
        </Row>,
      ];
    }

    return formElements;
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
    const { fields, editorState } = this.props;
    const fieldType = fields.fieldType.value;

    return (
      <form onSubmit={this.submitForm}>

        <div className={styles.fields}>
          <div className={styles.fieldsTitle}>Fields</div>

          <div style={{ display : "table" }}>

            <Row key="s1">
              <div className={styles.key}>Field Name :</div>
              <TextInput field={fields.fieldName}/>
            </Row>

            <Row key="s2">
              <div className={styles.key}>Field Type :</div>
              <StaticListInput
                field={fields.fieldType}
                className={styles.field}
                list={["Number", "Date", "String", "Boolean", "Reference"]}
              />
            </Row>
          </div>
        </div>

        <div className={styles.defn}>
          <div className={styles.defnTitle}>Definition</div>
          <div style={{ display : "table" }}>
            {this.getFieldProps(fieldType, fields)}
          </div>
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
