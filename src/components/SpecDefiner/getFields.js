import React from "react";
import Row from "./Row";
import { Field } from "redux-form";
import { TextInput, DateInput, CheckBoxInput, NumericInput, SelectInput } from "../Inputs";

const getFields = (fieldName, fieldType, fieldProps) => {
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

  if (fieldType === "Boolean") {
    formElements = [
      <Field name={config.default.key} component={CheckBoxInput}>{config.default.displayText}</Field>
    ];
  }
  if (fieldType === "Date") {
    formElements = [
      <Row key={`fieldProps.${config.default.key}`} prop={config.default} component={DateInput}/>,
    ];
  }
  if (fieldType === "String") {
    formElements = [
      <Row key={`fieldProps.${config.enum.key}`} prop={config.enum} component={TextInput}/>,
      <Row key={`fieldProps.${config.default.key}`} prop={config.default} component={TextInput}/>,
    ];
  }
  if (fieldType === "Number") {
    formElements = [
      <Row key={`fieldProps.${config.min.key}`} prop={config.min} component={NumericInput}/>,
      <Row key={`fieldProps.${config.max.key}`} prop={config.max} component={NumericInput}/>,
      <Row key={`fieldProps.${config.default.key}`} prop={config.default} component={NumericInput}/>,
    ];
  }
  if (fieldType === "ObjectId") {
    formElements = [
      <Row key={`fieldProps.${config.ref.key}`} prop={config.ref}
           component={SelectInput} api="api/list/templates"
      />,
    ];

    const id = fieldProps && fieldProps.ref && fieldProps.ref.id;
    if (id) {
      formElements = [
        ...formElements,
        <Row key={`fieldProps.${config.refField.key}`} prop={config.refField}
             component={SelectInput} api={`api/list/templates/${id}`}
        />,
      ];
    }
  }

  formElements = [
    ...formElements,
    <Field name={config.required.key} component={CheckBoxInput}>{config.required.displayText}</Field>,
    <Field name={config.unique.key} component={CheckBoxInput}>{config.unique.displayText}</Field>
  ];

  return formElements;
};

export default getFields;
