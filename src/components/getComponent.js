import { isNonZeroArray } from "utils";
import { TextInput, DateInput, NumericInput, ArrayInput, SelectInput, StaticSelectInput, ImageInput } from "components";

const getComponent = {
  date        : (_) => ({ component : DateInput }),
  number      : (_) => ({ component : NumericInput }),
  schema      : (_) => ({ component : ArrayInput, limit : true }),
  schemaArray : (_) => ({ component : ArrayInput }),
  binData     : (_) => ({ component : ImageInput }),
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
    api       : `api/list/${props.tableRef.id}/${props.fieldRef.id}`,
  }),
};

export default getComponent;
