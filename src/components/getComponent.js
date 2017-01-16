import { TextInput, DateInput, NumericInput, ArrayInput, SelectInput, StaticSelectInput } from "./index";

const getComponent = {
  date        : (props) => ({ component : DateInput }),
  number      : (props) => ({ component : NumericInput }),
  schema      : (props) => ({ component : ArrayInput }),
  schemaArray : (props) => ({ component : DateInput }),
  string      : (props) => {
    if (props.enum.length >= 1) {
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
