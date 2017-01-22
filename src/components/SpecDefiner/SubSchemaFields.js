import React from "react";
import { Button, TextInput, StaticSelectInput } from "components";
import SDRow from "./SDRow";
import getFields from "./getFields";
import styles from "./common.less";
import cx from "classnames";

const SubSchemaFields = ({ fields, fieldSchema }) => {
  const addSchema    = (e) => {
    e.preventDefault();
    fields.push({});
  };
  const removeSchema = (e, index) => {
    e.preventDefault();
    fields.remove(index);
  };

  const subSchemaFields = fields.map((field, idx) => {
    const fieldDefn                 = {
      fieldName : { key : `${field}.fieldName`, displayText : "Field Name" },
      fieldType : { key : `${field}.fieldType`, displayText : "Field Type" },
    };
    const subFieldSchema            = fieldSchema && (fieldSchema[idx] || {});
    const { fieldType, fieldProps } = subFieldSchema;

    return (
      <div className={cx("row", styles.subField)} key={idx}>
        <div className="col-md-11">
          <h6 className={styles.headers}>{`Sub-Field-${idx + 1}`}</h6>
          <SDRow required
                 component={TextInput}
                 prop={fieldDefn.fieldName}
          />
          <SDRow required
                 component={StaticSelectInput}
                 prop={fieldDefn.fieldType}
                 options={["number", "date", "string", "boolean", "objectId"]}
          />
          {
            fieldType &&
            getFields(`${field}.fieldProps`, fieldType, fieldProps)
          }
        </div>

        <div className="col-md-1">
          <Button tabIndex="-1" faName="times" style="danger" onClick={e => removeSchema(e, idx)}/>
        </div>
      </div>
    );
  });

  return (
    <div className={styles.subSchemaFields}>
      <h5 className={cx("pull-left", styles.headers)}>Add a new schema</h5>

      <Button className="pull-right"
              faName="plus"
              style="success"
              onClick={addSchema}
              title="Click to add a new embedded field"
      >
        Add
      </Button>

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

export default SubSchemaFields;
