import React from "react";
import { Button, TextInput, StaticSelectInput } from "components";
import cx from "classnames";
import SDRow from "./SDRow";
import styles from "./styles.less";
import getFields from "./getFields";
import { SUB_FIELD_TYPES } from "./fieldTypeHash";

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
    const subFieldSchema            = fieldSchema && (fieldSchema[idx] || {});
    const { fieldType, fieldProps } = subFieldSchema;

    return (
      <div className={cx("row", styles.subField)} key={idx}>
        <div className="col-md-11">
          <h6 className={styles.headers}>{`Sub-Field-${idx + 1}`}</h6>
          <SDRow required
                 name={`${field}.fieldName`}
                 displayText="Field Name"
                 component={TextInput}
          />
          <SDRow required
                 name={`${field}.fieldType`}
                 displayText="Field Type"
                 component={StaticSelectInput}
                 options={SUB_FIELD_TYPES}
          />
          {
            fieldType && getFields[fieldType](`${field}.fieldProps`, fieldProps)
          }
        </div>

        <div className="col-md-1">
          <Button tabIndex="-1" faName="times" style="danger" onClick={e => removeSchema(e, idx)}/>
        </div>
      </div>
    );
  });

  return (
    <div>
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
  fields      : React.PropTypes.object.isRequired,
  fieldSchema : React.PropTypes.array,
};

export default SubSchemaFields;
