import React, { Component } from "react";
import { Field } from "redux-form";
import { Button, componentsHash } from "components";
import { props, padWithZeros, imap } from "utils";

const getValuesFromField = props(["displayName", "fieldName", "fieldType", "fieldProps"]);

class SchemaArrayInput extends Component {
  constructor() {
    super();
    this.getFields = this.getFields.bind(this);
  }

  getFields() {
    const { fields, schema }   = this.props;
    const onClickRemoveHandler = (e, index) => {
      e.preventDefault();
      fields.remove(index);
    };

    if (fields.length !== 0) {
      const iteratee = (field, fieldIdx) => {
        const renderFields = (schemaField, schemaFieldKey) => {
          const [displayName, fieldName, fieldType, fieldProps] = getValuesFromField(schemaField);
          const component                                       = componentsHash[fieldType].input(fieldProps);

          let required;
          let unique;
          if (fieldProps) {
            required = fieldProps.required;
            unique   = fieldProps.unique;
          }

          return (
            <div className="form-group row" key={fieldIdx}>
              <label className="col-sm-3 col-form-label">
                {displayName}
                {required && <bold><sup>*</sup></bold>}
                {unique && <bold><sup>u</sup></bold>}
              </label>
              <div className="col-sm-9">
                <Field name={`${field}.${fieldName}`}
                       {...component}
                />
              </div>
            </div>
          );
        };

        return (
          <div key={fieldIdx}>
            <div style={{ margin : "8px 0px" }}>
              <strong><u>{padWithZeros(fieldIdx + 1, 2)}</u></strong>
              <Button tabIndex="-1"
                      style="danger"
                      faName="times"
                      className="pull-right"
                      onClick={e => onClickRemoveHandler(e, fieldIdx)}
              />
            </div>
            {imap(renderFields, schema)}
          </div>
        );
      };
      return fields.map(iteratee);
    }
    return null;
  }

  render() {
    const { fields, title, limit } = this.props;
    const onClickAddHandler        = e => {
      e.preventDefault();
      fields.push({});
    };
    const canFieldBeAdded          = limit ? fields.length < 1 : true;

    return (
      <div>
        <div style={{ margin : "12px 0" }}>
          <strong><em>{`Enter data into ${title} ${!limit ? "Array" : "Field"}`}</em></strong>
          <Button style="primary" className="pull-right" faName="plus" onClick={e => {
            if (canFieldBeAdded) return onClickAddHandler(e);
            alert("Schema FieldType can hold only one nested entry....");
          }}>
            {`Add ${title}`}
          </Button>
        </div>

        {(fields.length !== 0) && <div>{this.getFields()}</div>}
      </div>
    );
  }
}

SchemaArrayInput.defaultProps = {
  limit : false,
};
SchemaArrayInput.propTypes    = {
  limit  : React.PropTypes.bool,
  fields : React.PropTypes.object,
  schema : React.PropTypes.array,
  title  : React.PropTypes.string,
};

export { SchemaArrayInput };
