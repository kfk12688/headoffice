import React from "react";
import { Button, TextInput, StaticSelectInput } from "components";
import Row from "./Row";
import getFields from "./getFields";
import styles from "./common.less";
import cx from "classnames";

export const SubSchemaFields = ({ fields, fieldSchema, className }) => {
  const addSchema = (e) => {
    e.preventDefault();
    fields.push({});
  };
  const removeSchema = (e, index) => {
    e.preventDefault();
    fields.remove(index);
  };

  const subSchemaFields = fields.map((field, idx) => {
    const fieldDefn = {
      fieldName : { key : `${field}.fieldName`, displayText : "Field Name" },
      fieldType : { key : `${field}.fieldType`, displayText : "Field Type" },
    };

    return (
      <div className={cx("row", styles.subField)} key={idx}>
        <div className="col-md-1">
          <Button faName="times" style="danger" onClick={e => removeSchema(e, idx)}/>
        </div>

        <div className="col-md-11">
          <h6 className={styles.headers}>{`Sub-Field-${idx + 1}`}</h6>
          <Row prop={fieldDefn.fieldName} component={TextInput} required/>
          <Row prop={fieldDefn.fieldType} component={StaticSelectInput} required
               options={["Number", "Date", "String", "Boolean", "ObjectId"]}
          />
          {
            fieldSchema && fieldSchema[idx] && fieldSchema[idx].fieldType &&
            getFields(`${field}.fieldProps`, fieldSchema[idx].fieldType, fieldSchema[idx].fieldProps)
          }
        </div>
      </div>
    );
  });

  return (
    <div className={className}>
      <h5 className={cx("pull-left", styles.headers)}>Add a new schema</h5>

      <div className="text-md-right">
        <Button style="success" title="Click to add a new embedded field" onClick={addSchema} faName="plus">
          Add
        </Button>
      </div>

      <div className="row">
        <div className="col-md-12">{subSchemaFields}</div>
      </div>
    </div>
  );
};

SubSchemaFields.propTypes = {
  className   : React.PropTypes.string,
  fields      : React.PropTypes.arrayOf(React.PropTypes.object),
  fieldSchema : React.PropTypes.array.isRequired,
};
