import React from "react";
import _ from "underscore";
import { TextInput, NumericInput, ListInput, DateInput } from "components";
import styles from "./factoryStyles.less";

export default function getForm(cols, fields) {
  function getInputElement(type, col, field) {
    const { displayText : title } = col;

    if (type === "list") {
      const { source : options } = col;

      return (
        <ListInput
          className={styles.inputField}
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
          className={styles.inputField}
          key={title}
          field={field}
        />
      );
    }
    if (type === "number") {
      return (
        <NumericInput
          className={styles.inputField}
          key={title}
          field={field}
        />
      );
    }

    return (
      <TextInput
        className={styles.inputField}
        key={title}
        field={field}
      />
    );
  }

  const formFields = [];
  _.forEach(cols, (col, colKey) => {
    const { fieldType } = col;
    let { insertable : isFormInputNeeded } = col;
    const nrmType = fieldType.trim().toLowerCase();

    isFormInputNeeded = (isFormInputNeeded === undefined) ? true : isFormInputNeeded;

    if (isFormInputNeeded) {
      formFields.push(
        <div className={styles.inputTableRow}>
          <div className={styles.inputTitle}>{col.displayText} :</div>
          {getInputElement(nrmType, col, fields[colKey])}
        </div>
      );
    }
  });

  return <div className={styles.inputTable}>{formFields}</div>;
}
