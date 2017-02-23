import { props, isNil } from "utils";
import React, { Component } from "react";
import { Field, FieldArray, reduxForm } from "redux-form";
import { componentsHash, Button } from "components";

const getValuesFromField = props(["displayName", "fieldName", "fieldType", "fieldProps", "fieldSchema"]);

class CollectionEntryForm extends Component {
  constructor() {
    super();
    this.getFields    = this.getFields.bind(this);
    this.getSubFields = this.getSubFields.bind(this);
    this.resetForm    = this.resetForm.bind(this);
    this.submitForm   = this.submitForm.bind(this);
  }

  getFields(schema) {
    const iteratee = (field, key) => {
      if (isNil(field.fieldSchema)) {
        const [displayName, fieldName, fieldType, fieldProps] = getValuesFromField(field);
        const component                                       = componentsHash[fieldType].input(fieldProps);

        let required;
        let unique;
        if (fieldProps) {
          required = fieldProps.required;
          unique   = fieldProps.unique;
        }

        return (
          <div key={key}>
            <div className="form-group row">
              <label className="col-xs-3 col-form-label">
                {displayName}
                {required && <bold><sup>*</sup></bold>}
                {unique && <bold><sup>u</sup></bold>}
              </label>
              <div className="col-xs-9">
                <Field name={fieldName}
                       {...component}
                />
              </div>
            </div>
          </div>
        );
      }
      return null;
    };
    return Array.prototype.map.call(schema, iteratee);
  }

  getSubFields(schema) {
    const iteratee = (field, key) => {
      if (!isNil(field.fieldSchema)) {
        const [displayName, fieldName, fieldType, fieldProps, fieldSchema] = getValuesFromField(field);
        const input                                                        = componentsHash[fieldType].input(fieldProps);

        if (fieldType === "schema") {
          return (
            React.createElement(
              input.component,
              {
                key,
                name   : fieldName,
                title  : displayName,
                schema : fieldSchema,
              }
            )
          );
        }

        if (fieldType === "schemaArray") {
          return (
            <FieldArray key={key}
                        name={fieldName}
                        title={displayName}
                        schema={fieldSchema}
                        {...input}
            />
          );
        }
      }
      return null;
    };
    return Array.prototype.map.call(schema, iteratee);
  }

  resetForm(e) {
    e.preventDefault();
    this.props.reset();
  }

  submitForm() {
    this.props.handleSubmit();
    this.props.reset();
  }

  render() {
    const { className, spec } = this.props;
    const fields              = this.getFields(spec);
    const subFields           = this.getSubFields(spec);

    return (
      <form className={className} onSubmit={this.props.handleSubmit(this.submitForm)}>
        <div>{fields}</div>
        {(subFields.length !== 0) && <div>{subFields}</div>}
        <div className="pull-right">
          <Button style="success" type="submit">Save Data</Button>
          <Button onClick={this.resetForm}>Cancel</Button>
        </div>
      </form>
    );
  }
}

CollectionEntryForm.propTypes = {
  className    : React.PropTypes.string,
  spec         : React.PropTypes.array.isRequired,
  handleSubmit : React.PropTypes.func,
  reset        : React.PropTypes.func,
};
export default reduxForm({
  form : "CollectionEntryForm",
})(CollectionEntryForm);
