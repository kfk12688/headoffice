/**
 * Created by sharavan on 13/09/16.
 */
import React from "react";
import { Button, TextInput, ComboInput } from "components";
import Row from "./FieldSchemaRow";
import getFields from "./getFields";
import styles from "./SubSchemaFields.less";

export const SubSchemaFields = ({ fields, fieldSchema }) => {
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
      <div className={styles.fieldSchemaCtn} key={idx}>
        <div className={styles.schemaFields}>
          <div className={styles.schemaFieldsTitle}>{`Sub-Field-${idx + 1}`}</div>
          <Row prop={fieldDefn.fieldName} component={TextInput}/>
          <Row prop={fieldDefn.fieldType} component={ComboInput}
               list={["Number", "Date", "String", "Boolean", "Reference"]}
          />
        </div>

        {
          fieldSchema && fieldSchema[idx] && fieldSchema[idx].fieldType &&
          <div className={styles.schemaDefn}>
            <div className={styles.schemaDefnTitle}>{`Field Definition-${idx + 1}`}</div>
            <div>{getFields(`${field}.fieldProps`, fieldSchema[idx].fieldType, fieldSchema[idx].fieldProps)}</div>
          </div>
        }

        <Button accent className={styles.schemaRemoveBtn} faName="times" onClick={e => removeSchema(e, idx)}/>
      </div>
    );
  });

  return (
    <div className={styles.schemaCtn}>
      <div className={styles.add}>
        <span>Add a new schema</span>
        <Button className={styles.addBtn} title="Click to add a new embedded field"
                accent="indigo" onClick={addSchema} faName="plus"
        >
          Add
        </Button>
      </div>
      <div className={styles.schemas}>
        {subSchemaFields}
      </div>
    </div>
  );
};

SubSchemaFields.propTypes = {
  fields      : React.PropTypes.arrayOf(React.PropTypes.object),
  fieldSchema : React.PropTypes.array.isRequired,
};
