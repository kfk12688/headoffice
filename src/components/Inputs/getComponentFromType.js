/**
 * Created by sharavan on 05/09/16.
 */
import { ComboSearchInput, TextInput, DateInput, NumericInput, ArrayInput, ComboInput } from "components";
import { listFieldValues } from "../../dataflow/lister/api";
import styles from "./common.less";

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
      component   : ComboSearchInput,
      loadOptions : listFieldValues({
        refId        : props.ref,
        refFieldName : props.refFieldName,
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
