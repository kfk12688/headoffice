import React, { Component } from "react";
import { connect } from "react-redux";
import { reduxForm, Field, formValueSelector } from "redux-form";
import { Button, TextInput, CheckBoxInput, NumericInput, ComboInput, DateInput } from "components";
import styles from "./SDForm.less";

const Row = ({ prop, component, ...rest }) =>
  <div style={{ marginBottom : 5 }}>
    <span className={styles.key}>{prop.displayText}</span>
    <Field name={prop.key} className={styles.field} {...rest} component={component}/>
  </div>;
Row.propTypes = {
  prop      : React.PropTypes.object,
  component : React.PropTypes.func,
};

class EditorEntryForm extends Component {
  constructor(props) {
    super(props);
    this.submitForm = this.submitForm.bind(this);
    this.resetForm = this.resetForm.bind(this);
  }

  getFieldProps(props, fieldType) {
    let formElements = [
      <Row key={`fieldProps.${props.required.key}`} prop={props.required} component={CheckBoxInput}/>,
      <Row key={`fieldProps.${props.unique.key}`} prop={props.unique} component={CheckBoxInput}/>,
    ];

    if (fieldType === "Boolean") {
      formElements = [
        ...formElements,
        <Row key={`fieldProps.${props.default.key}`} prop={props.default} component={CheckBoxInput}/>,
      ];
    }

    if (fieldType === "Date") {
      formElements = [
        ...formElements,
        <Row key={`fieldProps.${props.default.key}`} prop={props.default} component={DateInput}/>,
      ];
    }
    if (fieldType === "String") {
      formElements = [
        ...formElements,
        <Row key={`fieldProps.${props.default.key}`} prop={props.default} component={TextInput}/>,
      ];
    }

    if (fieldType === "Number") {
      formElements = [
        ...formElements,
        <Row key={`fieldProps.${props.min.key}`} prop={props.min} component={NumericInput}/>,
        <Row key={`fieldProps.${props.max.key}`} prop={props.max} component={NumericInput}/>,
        <Row key={`fieldProps.${props.default.key}`} prop={props.default} component={NumericInput}/>,
      ];
    }
    if (fieldType === "Reference") {
      formElements = [
        ...formElements,
        <Row key={`fieldProps.${props.ref.key}`} prop={props.ref} component={TextInput}/>,
      ];
    }

    return formElements;
  }

  submitForm(e) {
    e.preventDefault();
    this.props.reset();
    this.props.handleSubmit();
  }

  resetForm(e) {
    e.preventDefault();
    this.props.reset();
  }

  render() {
    const { pristine, submitting, fieldType } = this.props;
    const fieldDefn = {
      fieldName : { key : "fieldName", displayText : "Field Name" },
      fieldType : { key : "fieldType", displayText : "Field Type" },
    };
    const fieldProps = {
      required : { key : "fieldProps.required", displayText : "Is Required" },
      unique   : { key : "fieldProps.unique", displayText : "Is Unique" },
      default  : { key : "fieldProps.default", displayText : "Default values" },
      min      : { key : "fieldProps.min", displayText : "Minimum" },
      max      : { key : "fieldProps.max", displayText : "Maximum" },
      ref      : { key : "fieldProps.ref", displayText : "Reference value" },
    };

    return (
      <form onSubmit={this.submitForm}>

        <div className={styles.fields}>
          <div className={styles.fieldsTitle}>Fields</div>
          <Row prop={fieldDefn.fieldName} component={TextInput}/>
          <Row prop={fieldDefn.fieldType} component={ComboInput}
               list={["Number", "Date", "String", "Boolean", "Reference"]}
          />
        </div>

        <div className={styles.defn}>
          <div className={styles.defnTitle}>Definition</div>
          <div>{this.getFieldProps(fieldProps, fieldType)}</div>
        </div>

        <div className={styles.formSubmitGroup}>
          <Button accent type="submit" disabled={pristine || submitting}>Add</Button>
          <Button bordered onClick={this.resetForm}>Cancel</Button>
        </div>
      </form>
    );
  }
}

EditorEntryForm.propTypes = {
  handleSubmit : React.PropTypes.func.isRequired,
  pristine     : React.PropTypes.bool,
  submitting   : React.PropTypes.bool,
  reset        : React.PropTypes.func,

  fieldType : React.PropTypes.any,
};

let form = reduxForm({
  form : "SDForm",
})(EditorEntryForm);

const selector = formValueSelector("SDForm"); // <-- same as form name
form = connect(
  state => ({
    fieldType : selector(state, "fieldType"),
  })
)(form);

export default form;
