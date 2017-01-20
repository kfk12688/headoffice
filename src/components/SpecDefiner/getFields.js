import React from "react";
import SDRow from "./SDRow";
import SubSchemaFields from "./SubSchemaFields";
import { Field, FieldArray } from "redux-form";
import { TextInput, DateInput, CheckBoxInput, NumericInput, SelectInput } from "../Inputs";

const getFields = (fieldName, fieldType, fieldProps, fieldSchema) => {
  const config = {
    required : { key : `${fieldName}.required`, displayText : "Is Required" },
    unique   : { key : `${fieldName}.unique`, displayText : "Is Unique" },
    default  : { key : `${fieldName}.default`, displayText : "Default values" },
    min      : { key : `${fieldName}.min`, displayText : "Minimum" },
    max      : { key : `${fieldName}.max`, displayText : "Maximum" },
    ref      : { key : `${fieldName}.ref`, displayText : "Reference to Table" },
    refField : { key : `${fieldName}.refField`, displayText : "Reference to Field" },
    enum     : { key : `${fieldName}.enum`, displayText : "List of values" },
  };

  let formElements = [];

  if (fieldType === "boolean") {
    formElements = [
      <Field key={`fieldProps.${config.default.key}`}
             name={config.default.key}
             component={CheckBoxInput}
      >
        {config.default.displayText}
      </Field>,
    ];
  }
  if (fieldType === "date") {
    formElements = [
      <SDRow key={`fieldProps.${config.default.key}`}
             prop={config.default}
             component={DateInput}
      />,
    ];
  }
  if (fieldType === "string") {
    formElements = [
      <SDRow key={`fieldProps.${config.enum.key}`}
             prop={config.enum}
             component={TextInput}
      />,
      <SDRow key={`fieldProps.${config.default.key}`}
             prop={config.default}
             component={TextInput}
      />,
    ];
  }
  if (fieldType === "number") {
    formElements = [
      <SDRow key={`fieldProps.${config.min.key}`}
             prop={config.min}
             component={NumericInput}
      />,
      <SDRow key={`fieldProps.${config.max.key}`}
             prop={config.max}
             component={NumericInput}
      />,
      <SDRow key={`fieldProps.${config.default.key}`}
             prop={config.default}
             component={NumericInput}
      />,
    ];
  }
  if (fieldType === "objectId") {
    formElements = [
      <SDRow key={`fieldProps.${config.ref.key}`}
             prop={config.ref}
             component={SelectInput}
             api="api/list/templates"
      />,
    ];

    const id = fieldProps && fieldProps.ref && fieldProps.ref.id;
    if (id) {
      formElements = [
        ...formElements,
        <SDRow key={`fieldProps.${config.refField.key}`}
               prop={config.refField}
               component={SelectInput}
               api={`api/list/templates/${id}`}
        />,
      ];
    }
  }

  if (fieldType === "schema") {
    formElements = [
      ...formElements,
      <FieldArray key="schema"
                  name="fieldSchema"
                  component={SubSchemaFields}
                  fieldSchema={fieldSchema}
      />,
    ];
  } else if (fieldType === "schemaArray") {
    formElements = [
      ...formElements,
      <FieldArray key="schemaArray"
                  name="fieldSchema"
                  component={SubSchemaFields}
                  fieldSchema={fieldSchema}
      />,
    ];
  } else {
    formElements = [
      ...formElements,
      <Field key={`fieldProps.${config.required.key}`}
             name={config.required.key}
             component={CheckBoxInput}
      >
        {config.required.displayText}
      </Field>,
      <Field key={`fieldProps.${config.unique.key}`}
             name={config.unique.key}
             component={CheckBoxInput}
      >
        {config.unique.displayText}
      </Field>,
    ];
  }

  return formElements;
};

export default getFields;
