import React, { Component } from "react";
import { Field } from "redux-form";
import { componentsHash } from "components";
import { props, imap } from "utils";

const getValuesFromField = props(["displayName", "fieldName", "fieldType", "fieldProps"]);

class SchemaInput extends Component {
  constructor() {
    super();
    this.getFields = this.getFields.bind(this);
  }

  getFields() {
    const { schema, name } = this.props;
    const renderFields     = (schemaField, schemaFieldKey) => {
      const [displayName, fieldName, fieldType, fieldProps] = getValuesFromField(schemaField);
      const component                                       = componentsHash[fieldType].input(fieldProps);

      let required;
      let unique;
      if (fieldProps) {
        required = fieldProps.required;
        unique   = fieldProps.unique;
      }

      return (
        <div className="form-group row" key={schemaFieldKey}>
          <label className="col-sm-3 col-form-label">
            {displayName}
            {required && <bold><sup>*</sup></bold>}
            {unique && <bold><sup>u</sup></bold>}
          </label>
          <div className="col-sm-9">
            <Field name={`${name}.${fieldName}`}
                   {...component}
            />
          </div>
        </div>
      );
    };

    return (imap(renderFields, schema));
  }

  render() {
    const { title } = this.props;

    return (
      <div>
        <div style={{ margin : "12px 0" }}>
          <strong><em>{`Enter data into ${title} Field`}</em></strong>
        </div>
        <div>{this.getFields()}</div>
      </div>
    );
  }
}

SchemaInput.propTypes = {
  schema : React.PropTypes.array,
  title  : React.PropTypes.string,
  name   : React.PropTypes.string,
};

export { SchemaInput };
