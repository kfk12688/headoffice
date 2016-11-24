import { TextInput, DateInput, NumericInput, ArrayInput, SelectInput, StaticSelectInput } from "./index";

export function getComponentFromType(type, props) {
  if (type === "Date") {
    return {
      component : DateInput,
    };
  }

  if ((type === "String") && (props.enum.length !== 0)) {
    return {
      component : StaticSelectInput,
      options   : props.enum,
    };
  }

  if (type === "Number") {
    return {
      component : NumericInput,
    };
  }

  if (type === "ObjectId") {
    return {
      component : SelectInput,
      api       : `api/list/${props.ref.id}/${props.refField.id}`,
    };
  }

  if ((type === "SchemaArray") || (type === "Schema")) {
    return { component : ArrayInput };
  }

  return {
    component : TextInput,
  };
}
