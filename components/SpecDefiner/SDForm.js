import React, { Component } from "react";
import { connect } from "react-redux";
import { reduxForm, Field, formValueSelector } from "redux-form";
import { Button, TextInput, CheckBoxInput, NumericInput, ComboInput, DateInput } from "components";
import styles from "./SDForm.less";

const Row = ({ prop, component, ...rest }) =>
  <div style={{ marginBottom : 5 }}>
    <span className={styles.key}>{prop.displayText}</span>
    <Field name={prop.key} {...rest} component={component}/>
  </div>;
Row.propTypes = {
  prop      : React.PropTypes.object,
  component : React.PropTypes.func,
};

class EditorEntryForm extends Component {
  constructor(props) {
    super(props);
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

    //
    // let formElements = [
    //   <Row key="1">
    //     <span className={styles.key}>Is Required</span>
    //     <Field name="fieldProps.required" component={CheckBoxInput}/>
    //   </Row>,
    //   <Row key="2">
    //     <span className={styles.key}>Is Unique</span>
    //     <Field name="fieldProps.unique" component={CheckBoxInput}/>
    //   </Row>,
    //   <Row key="3">
    //     <span className={styles.key}>Default values</span>
    //     <Field name="fieldProps.default" component={TextInput}/>
    //   </Row>,
    // ];
    //
    // if (fieldType === "String") {
    //   formElements = [
    //     ...formElements,
    //     <Row key="4">
    //       <span className={styles.key}>Enum values</span>
    //       <FieldArray name="enum" component={TextInput}/>
    //     </Row>,
    //   ];
    // }
    //
    // if (fieldType === "Number") {
    //   formElements = [
    //     ...formElements,
    //     <Row key="5">
    //       <span className={styles.key}>Min value</span>
    //       <Field name="fieldProps.min" component={NumericInput}/>
    //     </Row>,
    //     <Row key="6">
    //       <span className={styles.key}>Max value</span>
    //       <Field name="fieldProps.max" component={NumericInput}/>
    //     </Row>,
    //   ];
    // }
    //
    // if (fieldType === "Reference") {
    //   formElements = [
    //     ...formElements,
    //     <Row key="7">
    //       <span className={styles.key}>Specify Object Ref</span>
    //       <Field name="fieldProps.ref" component={TextInput}/>
    //     </Row>,
    //   ];
    // }
    //
    // return formElements;
  }

  resetForm(e) {
    e.preventDefault();
    this.props.reset();
  }

  render() {
    const { handleSubmit, editorState, pristine, submitting, fieldType } = this.props;
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
      <form onSubmit={handleSubmit}>

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
          <Button accent type="submit" disabled={pristine || submitting}>{editorState ? "Add" : "Edit"}</Button>
          <Button onClick={this.resetForm}>Cancel</Button>
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
  // indicates the state of the form - whether edit/addition
  editorState  : React.PropTypes.bool,

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
