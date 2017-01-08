import React, { Component } from "react";
import SDRow from "./SDRow";
import { connect } from "react-redux";
import { reduxForm, formValueSelector } from "redux-form";
import { Button, TextInput, StaticSelectInput } from "components";
import getFields from "./getFields";
import styles from "./common.less";
import cx from "classnames";

const FIELD_TYPES = ["Number", "Date", "String", "Boolean", "ObjectId", "Schema", "SchemaArray"];

class EditorEntryForm extends Component {
  constructor(props) {
    super(props);
    this.submitForm = this.submitForm.bind(this);
    this.resetForm  = this.resetForm.bind(this);
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
    const { pristine, submitting, fieldType, fieldProps, fieldSchema } = this.props;
    const fieldDefn                                                    = {
      fieldName : { key : "fieldName", displayText : "Field Name" },
      fieldType : { key : "fieldType", displayText : "Field Type" },
    };

    return (
      <form onSubmit={this.submitForm}>
        <div className="row">
          <div className="col-md-12">
            <SDRow prop={fieldDefn.fieldName} component={TextInput} required/>
            <SDRow prop={fieldDefn.fieldType} component={StaticSelectInput} options={FIELD_TYPES} required/>
            {getFields("fieldProps", fieldType, fieldProps, fieldSchema)}
          </div>
        </div>

        <div className={cx("row", styles.submitRow)}>
          <div className="col-md-12 text-md-right">
            <Button style="primary" type="submit" disabled={pristine || submitting}>Save Schema Field</Button>
            <Button onClick={this.resetForm}>Cancel</Button>
          </div>
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

const form = reduxForm({
  form : "SDForm",
})(EditorEntryForm);

const selector      = formValueSelector("SDForm"); // <-- same as form name
const connectedForm = connect(
  state => ({
    fieldType   : selector(state, "fieldType"),
    fieldProps  : selector(state, "fieldProps"),
    fieldSchema : selector(state, "fieldSchema"),
  })
)(form);

export default connectedForm;
