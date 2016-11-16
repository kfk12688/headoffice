import React from "react";
import { Button, TextInput, ComboInput } from "components";
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
      <div className={cx("row")} key={idx}>
        <div className="col-md-1">
          <Button faName="times" onClick={e => removeSchema(e, idx)}/>
        </div>

        <div className="col-md-11">
          <h6 className={styles.headers}>{`Sub-Field-${idx + 1}`}</h6>
          <Row prop={fieldDefn.fieldName} component={TextInput}/>
          <Row prop={fieldDefn.fieldType} component={ComboInput}
               list={["Number", "Date", "String", "Boolean", "Reference"]}
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
      <h5 className={cx("pull-left",styles.headers)}>Add a new schema</h5>

      <div className="text-md-right">
        <Button 
          style="primary"
          title="Click to add a new embedded field"
          onClick={addSchema}
          faName="plus"
        >
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
  fields      : React.PropTypes.arrayOf(React.PropTypes.object),
  fieldSchema : React.PropTypes.array.isRequired,
};
