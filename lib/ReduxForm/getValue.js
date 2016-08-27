/**
 * Created by sharavan on 26/08/16.
 */
import isEvent from "./isEvent";

const getSelectedValues = options => {
  const result = [];
  if (options) {
    for (let index = 0; index < options.length; index++) {
      const option = options[index];
      if (option.selected) {
        result.push(option.value);
      }
    }
  }
  return result;
};

const getValue = (event) => {
  if (isEvent(event)) {
    if (event.nativeEvent && event.nativeEvent.text !== undefined) {
      return event.nativeEvent.text;
    }

    const { target: { type, value, checked } } = event;
    if (type === "checkbox") {
      return checked;
    }
    if (type === "select-multiple") {
      return getSelectedValues(event.target.options);
    }
    if (value !== "" && (type === "number" || type === "range")) {
      return parseFloat(value);
    }
    return value;
  }

  return event;
};

export default getValue;
