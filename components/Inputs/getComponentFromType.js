/**
 * Created by sharavan on 05/09/16.
 */
import { ComboSearchInput, TextInput, DateInput, NumericInput, ArrayInput } from "components";
import styles from "./common.less";
import { listFieldValues } from "../../dataflow/lister/api";

export function getComponentFromType(type, ref) {
  if (type === "Date") return { component : DateInput, className : styles.dateCtn };
  if (type === "Number") return { component : NumericInput };
  if (type === "ObjectId") {
    return {
      component   : ComboSearchInput,
      loadOptions : listFieldValues(ref),
      className   : styles.dateCtn,
    };
  }
  if (type === "SchemaArray") return { component : ArrayInput };
  return { component : TextInput };
}
