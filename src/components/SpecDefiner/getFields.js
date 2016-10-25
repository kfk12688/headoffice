/**
 * Created by sharavan on 13/09/16.
 */
import React from "react";
import Row from "./FieldSchemaRow";
import { TextInput, DateInput, CheckBoxInput, NumericInput, SelectInput } from "../Inputs";
import { listTemplates, listTemplateFields } from "dataflow/api";

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

  let formElements = [
    <Row key={`fieldProps.${config.required.key}`} prop={config.required} component={CheckBoxInput}/>,
    <Row key={`fieldProps.${config.unique.key}`} prop={config.unique} component={CheckBoxInput}/>,
  ];

  if (fieldType === "Boolean") {
    formElements = [
      ...formElements,
      <Row key={`fieldProps.${config.default.key}`} prop={config.default} component={CheckBoxInput}/>,
    ];
  }
  if (fieldType === "Date") {
    formElements = [
      ...formElements,
      <Row key={`fieldProps.${config.default.key}`} prop={config.default} component={DateInput}/>,
    ];
  }
  if (fieldType === "String") {
    formElements = [
      ...formElements,
      <Row key={`fieldProps.${config.enum.key}`} prop={config.enum} component={TextInput}/>,
      <Row key={`fieldProps.${config.default.key}`} prop={config.default} component={TextInput}/>,
    ];
  }
  if (fieldType === "Number") {
    formElements = [
      ...formElements,
      <Row key={`fieldProps.${config.min.key}`} prop={config.min} component={NumericInput}/>,
      <Row key={`fieldProps.${config.max.key}`} prop={config.max} component={NumericInput}/>,
      <Row key={`fieldProps.${config.default.key}`} prop={config.default} component={NumericInput}/>,
    ];
  }
  if (fieldType === "ObjectId") {

    formElements = [
      ...formElements,
      <Row key={`fieldProps.${config.ref.key}`} prop={config.ref}
           component={SelectInput} loadOptions={listTemplates}
      />,
    ];

    const templateName = fieldProps && fieldProps.ref && fieldProps.ref.id;
    if (templateName) {
      formElements = [
        ...formElements,
        <Row key={`fieldProps.${config.refField.key}`} prop={config.refField}
             component={SelectInput} loadOptions={listTemplateFields(templateName)}
        />,
      ];
    }
  }

  return formElements;
};

export default getFields;
