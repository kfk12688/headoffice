import React, { Component } from "react";
import { connect } from "react-redux";
import { reduxForm, formValueSelector } from "redux-form";
import { Button, TextInput, StaticSelectInput } from "components";
import cx from "classnames";
import SDRow from "./SDRow";
import styles from "./styles.less";
import getFields from "./getFields";
import { FIELD_TYPES } from "./fieldTypeHash";

class SDForm extends Component {
  constructor(props) {
    super(props);
    this.submitForm = this.submitForm.bind(this);
    this.resetForm  = this.resetForm.bind(this);
  }

  submitForm(e) {
    e.preventDefault();
    this.props.reset();
    this.props.handleSubmit();
    this.fieldNameNode.firstChild.focus();
  }

  resetForm(e) {
    e.preventDefault();
    this.props.reset();
    this.fieldNameNode.firstChild.focus();
  }

  render() {
    const { pristine, submitting, fieldType, fieldProps, fieldSchema } = this.props;

    return (
      <form onSubmit={this.submitForm}>
        <div className="row">
          <div className="col-md-12">
            <SDRow required
                   refCb={node => { this.fieldNameNode = node; }}
                   name="fieldName"
                   displayText="Field Name"
                   component={TextInput}
            />
            <SDRow required
                   name="fieldType"
                   displayText="Field Type"
                   component={StaticSelectInput}
                   options={FIELD_TYPES}
            />
            {fieldType && getFields[fieldType]("fieldProps", fieldProps, fieldSchema)}
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

SDForm.propTypes    = {
  handleSubmit : React.PropTypes.func.isRequired,
  pristine     : React.PropTypes.bool,
  submitting   : React.PropTypes.bool,
  reset        : React.PropTypes.func,

  fieldType   : React.PropTypes.any,
  fieldProps  : React.PropTypes.any,
  fieldSchema : React.PropTypes.any,
};
const form          = reduxForm({
  form : "SDForm",
})(SDForm);
const selector      = formValueSelector("SDForm"); // <-- same as form name
const connectedForm = connect(
  state => ({
    fieldType   : selector(state, "fieldType"),
    fieldProps  : selector(state, "fieldProps"),
    fieldSchema : selector(state, "fieldSchema"),
  })
)(form);

export default connectedForm;
