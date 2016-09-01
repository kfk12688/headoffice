import React from "react";
import { TextInput, NumericInput, ComboSearchInput, DateInput } from "components";
import styles from "./factoryStyles.less";

export default function getInputElement(type, col, field) {
  const { displayText : title } = col;

  if (type === "list") {
    const { source : options } = col;
    return (
      <ComboSearchInput
        className={styles.inputField}
        key={title}
        options={options}
        field={field}
      />
    );
  }
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

// export default function getForm(cols, fields) {
//   const formFields = [];
//   const auxFields = [];
//
//   _.forEach(cols, col => {
//     let { insertable : isFormInputNeeded } = col;
//     isFormInputNeeded = (isFormInputNeeded === undefined) ? true : isFormInputNeeded;
//
//     if (isFormInputNeeded) {
//       const { fieldType, fieldName } = col;
//       const nrmType = fieldType.trim().toLowerCase();
//
//       if ("value" in fields[fieldName]) {
//         formFields.push(
//           <div className={styles.inputTableRow}>
//             <span className={styles.inputTitle}>{col.displayText} :</span>
//             {getInputElement(nrmType, col, fields[fieldName])}
//           </div>
//         );
//       } else {
//         _.forEach(fields[fieldName], field => {
//           const { fieldType:nestedFieldType, fieldName:nestedFieldName } = field;
//           const nesetedNrmType = nestedFieldType.trim().toLowerCase();
//
//           auxFields.push(
//             <div className={styles.inputTableRow}>
//               <span className={styles.inputTitle}>{col.displayText} :</span>
//               {getInputElement(nesetedNrmType, col, fields[nestedFieldName])}
//             </div>
//           );
//         });
//       }
//     }
//   });
//
//   return (
//     <div style={{ display : "inline-block" }}>
//       <div style={{ float : "left" }}>{formFields}</div>
//       <div style={{ float : "right" }}>{auxFields}</div>
//     </div>
//   );
// }
