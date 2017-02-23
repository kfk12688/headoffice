import React from "react";
import SDRow from "./SDRow";
import SubSchemaFields from "./SubSchemaFields";
import { Field, FieldArray } from "redux-form";
import { TextInput, DateInput, CheckBoxInput, DecimalInput, IntegerInput, SelectInput, TimeStampInput } from "../componentsHash";

const getFields = {
  integer     : fieldName => [
    <SDRow key={`${fieldName}.min`}
           name={`${fieldName}.min`}
           displayText="Enter Min Value"
           component={IntegerInput}
    />,
    <SDRow key={`${fieldName}.max`}
           name={`${fieldName}.max`}
           displayText="Enter Max Value"
           component={IntegerInput}
    />,
    <SDRow key={`${fieldName}.default`}
           name={`${fieldName}.default`}
           displayText="Enter a default Value"
           component={IntegerInput}
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
  decimal     : fieldName => [
    <SDRow key={`${fieldName}.min`}
           name={`${fieldName}.min`}
           displayText="Enter Min Value"
           component={DecimalInput}
    />,
    <SDRow key={`${fieldName}.max`}
           name={`${fieldName}.max`}
           displayText="Enter Max Value"
           component={DecimalInput}
    />,
    <SDRow key={`${fieldName}.default`}
           name={`${fieldName}.default`}
           displayText="Enter a default Value"
           component={DecimalInput}
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
  time        : fieldName => [
    <SDRow key={`${fieldName}.default`}
           name={`${fieldName}.default`}
           displayText="Default Value"
           component={TimeStampInput}
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
  text        : fieldName => [
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
  list        : fieldName => [
    <SDRow key={`${fieldName}.options`}
           name={`${fieldName}.options`}
           displayText="List of values (seperated by ,)"
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
  longtext    : fieldName => [
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
  image       : fieldName => [
    <Field key={`${fieldName}.required`}
           name={`${fieldName}.required`}
           component={CheckBoxInput}
    >
      Is Required
    </Field>,
  ],
  reference   : (fieldName, fieldProps) => {
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
};

export default getFields;
