import React, { Component } from "react";
import Row from "./FieldSchemaRow";
import { connect } from "react-redux";
import { reduxForm, FieldArray, formValueSelector } from "redux-form";
import { Button, TextInput, ComboInput } from "components";
import getFields from "./getFields";
import { SubSchemaFields } from "./SubSchemaFields";
import styles from "./SDForm.less";

const FIELD_TYPES = ["Number", "Date", "String", "Boolean", "Reference", "Schema", "SchemaArray"];

class EditorEntryForm extends Component {
  constructor(props) {
    super(props);
    this.submitForm = this.submitForm.bind(this);
    this.resetForm = this.resetForm.bind(this);
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
    const { pristine, submitting, fieldType, fieldSchema, fieldProps } = this.props;
    const fieldDefn = {
      fieldName : { key : "fieldName", displayText : "Field Name" },
      fieldType : { key : "fieldType", displayText : "Field Type" },
    };

    return (
      <form onSubmit={this.submitForm} className={styles.formCtn}>

        <div className={styles.firstLevelSchemaCtn}>
          <div className={styles.fields}>
            <div className={styles.fieldsTitle}>Field</div>
            <Row prop={fieldDefn.fieldName} component={TextInput}/>
            <Row prop={fieldDefn.fieldType} component={ComboInput}
                 list={FIELD_TYPES}
            />
          </div>

          <div className={styles.defn}>
            <div className={styles.defnTitle}>Field Definition</div>
            <div>{getFields("fieldProps", fieldType, fieldProps)}</div>
          </div>
        </div>

        {
          ((fieldType === "SchemaArray") || (fieldType === "Schema")) &&
          <FieldArray
            name="fieldSchema" className={styles.field}
            component={SubSchemaFields} fieldSchema={fieldSchema}
          />
        }

        <div className={styles.formSubmitGroup}>
          <Button accent type="submit" disabled={pristine || submitting}>Save Schema Field</Button>
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

  fieldType   : React.PropTypes.any,
  fieldProps  : React.PropTypes.any,
  fieldSchema : React.PropTypes.any,
};

let form = reduxForm({
  form : "SDForm",
})(EditorEntryForm);

const selector = formValueSelector("SDForm"); // <-- same as form name
form = connect(
  state => ({
    fieldType   : selector(state, "fieldType"),
    fieldProps  : selector(state, "fieldProps"),
    fieldSchema : selector(state, "fieldSchema"),
  })
)(form);

export default form;
