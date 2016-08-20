import React from "react";
import { TextInput, NumericInput, ListInput, DateInput } from "components";
import styles from "./factoryStyles.less";

export default function getForm(cols, fields) {
  function getInputElement(type, col, field) {
    const { displayText : title } = col;

    if (type === "list") {
      const { source : options } = col;

      return (
        <ListInput
          key={title}
          options={options}
          field={field}
        />
      );
    }
    // if (type === "reference") {
    //   const { refTableSource : tableOptions, refFieldSource : fieldOptions } = col;
    //
    //   return (
    //     <ReferenceInput
    //       key={title}
    //       tableOptions={tableOptions}
    //       fieldOptions={fieldOptions}
    //       field={field}
    //     />
    //   );
    // }
    if (type === "date") {
      return (
        <DateInput
          key={title}
          field={field}
        />
      );
    }
    if (type === "number") {
      return (
        <NumericInput
          key={title}
          field={field}
        />
      );
    }

    return (
      <TextInput
        key={title}
        field={field}
      />
    );
  }

  const formFields = [];
  for (const colKey in cols) {
    const col = cols[colKey];
    const { renderType : type } = col;
    let { insertable : isFormInputNeeded } = col;
    isFormInputNeeded = (isFormInputNeeded === undefined) ? true : isFormInputNeeded;

    if (isFormInputNeeded) {
      formFields.push(
        <div className={styles.inputContainer}>
          <div className={styles.inputTitle}>{col.displayText} :</div>
          {getInputElement(type, col, fields[colKey])}
        </div>
      );
    }
  }

  return formFields;
}
