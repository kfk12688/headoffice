/**
 * Created by sharavan on 05/09/16.
 */
import { TextInput, DateInput, NumericInput, ArrayInput, ComboInput, SelectInput } from "./index";
import { listFieldValues } from "../dataflow/api";
import styles from "./Inputs/common.less";

export function getComponentFromType(type, props) {
  if (type === "Date") {
    return {
      component : DateInput,
      className : styles.ctn,
    };
  }

  if ((type === "String") && (props.enum.length !== 0)) {
    return {
      component : ComboInput,
      className : styles.ctn,
      list      : props.enum,
    };
  }

  if (type === "Number") {
    return {
      component : NumericInput,
      className : styles.ctn,
    };
  }

  if (type === "ObjectId") {
    return {
      component   : SelectInput,
      loadOptions : listFieldValues({
        ref      : props.ref.id,
        refField : props.refField.id,
      }),
      className   : styles.ctn,
    };
  }

  if ((type === "SchemaArray") || (type === "Schema")) {
    return { component : ArrayInput };
  }

  return {
    component : TextInput,
    className : styles.ctn,
  };
}
