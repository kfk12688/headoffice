/**
 * Created by sharavan on 13/09/16.
 */
import React from "react";
import Row from "./FieldSchemaRow";
import { TextInput, ComboSearchInput, DateInput, CheckBoxInput, NumericInput } from "components";
import { listTemplates, listTemplateFields } from "dataflow/lister/api";

const getFields = (fieldName, fieldType) => {
  const config = {
    required : { key : `${fieldName}.required`, displayText : "Is Required" },
    unique   : { key : `${fieldName}.unique`, displayText : "Is Unique" },
    default  : { key : `${fieldName}.default`, displayText : "Default values" },
    min      : { key : `${fieldName}.min`, displayText : "Minimum" },
    max      : { key : `${fieldName}.max`, displayText : "Maximum" },
    ref      : { key : `${fieldName}.ref`, displayText : "Reference to Table" },
    refField : { key : `${fieldName}.refField`, displayText : "Reference to Field" },
  };

  console.log(config);

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
  if (fieldType === "Reference") {
    formElements = [
      ...formElements,
      <Row key={`fieldProps.${config.ref.key}`} prop={config.ref}
           component={ComboSearchInput} loadOptions={listTemplates}
      />,
      <Row key={`fieldProps.${config.refField.key}`} prop={config.refField}
           component={ComboSearchInput} loadOptions={listTemplateFields(id)}
      />,
    ];
  }

  return formElements;
};

export default getFields;
