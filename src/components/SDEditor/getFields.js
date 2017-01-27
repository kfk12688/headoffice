import React from "react";
import SDRow from "./SDRow";
import SubSchemaFields from "./SubSchemaFields";
import { Field, FieldArray } from "redux-form";
import { TextInput, DateInput, CheckBoxInput, NumericInput, SelectInput } from "components";

const getFields = {
  boolean     : fieldName => [
    <Field key={`${fieldName}.default`}
           name={`${fieldName}.default`}
           component={CheckBoxInput}
    >
      Should default be True
    </Field>,
    <Field key={`${fieldName}.required`}
           name={`${fieldName}.required`}
           component={CheckBoxInput}
    >
      Is Unique
    </Field>,
  ],
  date        : fieldName => [
    <SDRow key={`${fieldName}.default`}
           name={`${fieldName}.default`}
           displayText="Default Value"
           component={DateInput}
    />,
    <Field key={`${fieldName}.required`}
           name={`${fieldName}.required`}
           component={CheckBoxInput}
    >
      Is Required
    </Field>,
    <Field key={`${fieldName}.unique`}
           name={`${fieldName}.unique`}
           component={CheckBoxInput}
    >
      Is Unique
    </Field>,
  ],
  string      : fieldName => [
    <SDRow key={`${fieldName}.enum`}
           name={`${fieldName}.enum`}
           displayText="List of values"
           component={TextInput}
    />,
    <SDRow key={`${fieldName}.default`}
           name={`${fieldName}.default`}
           displayText="Default text"
           component={TextInput}
    />,
    <Field key={`${fieldName}.required`}
           name={`${fieldName}.required`}
           component={CheckBoxInput}
    >
      Is Required
    </Field>,
    <Field key={`${fieldName}.unique`}
           name={`${fieldName}.unique`}
           component={CheckBoxInput}
    >
      Is Unique
    </Field>,
  ],
  number      : fieldName => [
    <SDRow key={`${fieldName}.min`}
           name={`${fieldName}.min`}
           displayText="Enter Min Value"
           component={NumericInput}
    />,
    <SDRow key={`${fieldName}.max`}
           name={`${fieldName}.max`}
           displayText="Enter Max Value"
           component={NumericInput}
    />,
    <SDRow key={`${fieldName}.default`}
           name={`${fieldName}.default`}
           displayText="Enter a default Value"
           component={NumericInput}
    />,
    <Field key={`${fieldName}.required`}
           name={`${fieldName}.required`}
           component={CheckBoxInput}
    >
      Is Required
    </Field>,
    <Field key={`${fieldName}.unique`}
           name={`${fieldName}.unique`}
           component={CheckBoxInput}
    >
      Is Unique
    </Field>,
  ],
  objectId    : (fieldName, fieldProps) => {
    const id = fieldProps && fieldProps.tableRef && fieldProps.tableRef.id;
    if (id) {
      return [
        <SDRow key={`${fieldName}.tableRef`}
               name={`${fieldName}.tableRef`}
               displayText="Table to reference from"
               component={SelectInput}
               api="api/list/templates"
        />,
        <SDRow key={`${fieldName}.fieldRef`}
               name={`${fieldName}.fieldRef`}
               displayText="Field to reference from"
               component={SelectInput}
               api={`api/list/templates/${id}`}
        />,
      ];
    }

    return [
      <SDRow key={`${fieldName}.tableRef`}
             name={`${fieldName}.tableRef`}
             displayText="Table to reference from"
             component={SelectInput}
             api="api/list/templates"
      />,
    ];
  },
  schema      : (_, __, fieldSchema) => [
    <FieldArray key="schema"
                name="fieldSchema"
                component={SubSchemaFields}
                fieldSchema={fieldSchema}
    />,
  ],
  schemaArray : (_, __, fieldSchema) => [
    <FieldArray key="schemaArray"
                name="fieldSchema"
                component={SubSchemaFields}
                fieldSchema={fieldSchema}
    />,
  ],
  binData     : fieldName => [
    <Field key={`${fieldName}.required`}
           name={`${fieldName}.required`}
           component={CheckBoxInput}
    >
      Is Required
    </Field>,
  ],
};

export default getFields;
