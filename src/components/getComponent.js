import { isNonZeroArray } from "utils";
import { TextInput, DateInput, NumericInput, ArrayInput, SelectInput, StaticSelectInput } from "./index";

const getComponent = {
  date        : (props) => ({ component : DateInput }),
  number      : (props) => ({ component : NumericInput }),
  schema      : (props) => ({ component : ArrayInput }),
  schemaArray : (props) => ({ component : ArrayInput }),
  string      : (props) => {
    if (props && props.enum && isNonZeroArray(props.enum)) {
      return {
        component : StaticSelectInput,
        options   : props.enum,
      };
    }
    return { component : TextInput };
  },
  objectId    : (props) => ({
    component : SelectInput,
    api       : `api/list/${props.ref.id}/${props.refField.id}`,
  }),
};

export default getComponent;
